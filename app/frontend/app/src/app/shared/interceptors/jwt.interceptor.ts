import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, pipe, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';
import { EnvironmentService } from '../services/environment.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _envService:EnvironmentService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // intercept only if user is logged in
    if (!this._authService.isLoggedIn) return next.handle(request);

    console.log('JWT INTERCEPTOR START');
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this._authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(this._envService.urlAddress);
    console.log('1. isLoggedIn: ', isLoggedIn);
    console.log('2. isApiUrl: ', isApiUrl);
    console.log('3. currentUser: ', currentUser);
    console.log('4. request: ', request);
    console.log('5. request.url: ', request.url);
    // console.log(request)
    if (isLoggedIn 
        && isApiUrl 
        && currentUser 
        && request.url != `${this._envService.urlAddress}/${this._envService.jwtRefresh}` 
        && request.url != `${this._envService.urlAddress}/${this._envService.jwtLogin}` 
        ) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    } 
    
    return next.handle(request).pipe(
        catchError(error => {
          console.log('6. error status: ', error.status)
          console.log('6. error message: ', error.message)
          if ( error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)
            && request.url === `${this._envService.urlAddress}/${this._envService.jwtRefresh}`) {
            // We do another check to see if refresh token failed
            // In this case we want to logout user and to redirect it to login page  
            // console.log('on your way out')            
            console.log('7. throw 1: ');
            this._authService.logout();              
            return throwError(() => new Error(error.message));
          }
          else if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log('7. throw 2: ');
            return this.handle401Error(request, next);
          } else {
            console.log('7. throw 3: ');
            return throwError(() => new Error(error.message));
          }
        })
      ) as Observable<HttpEvent<any>>

    // return next.handle(request);
  }


  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // console.log('handling 403')
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // console.log(': ', request.url);

      return this._authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          console.log('8. NEW TOKEN: ', token)
          console.log('8. NEW TOKEN (refresh): ', token.refresh)
          this.refreshTokenSubject.next(token.refresh);
          return next.handle(this.addToken(request, token.refresh));
        }));
  
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    const currentUser = this._authService.currentUserValue;
    if (currentUser)
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer  ${currentUser.token}`
        }
      });
    else return request
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvironmentService } from "./environment.service";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

export interface ApiRequestOptions {
  headers: Record<string, any>;
  params: Record<string, any>;
  reportProgress: boolean;
  observe: any;
  responseType: any;
  withCredentials: boolean;
}

export function getApiRequestOptions(options?: Partial<ApiRequestOptions>): Partial<ApiRequestOptions> | undefined {
  if (options) {
    let params: Record<string, any> = {};
    let headers: Record<string, any> = {};
    if (options.headers) {
      headers = !(options?.headers instanceof HttpHeaders) ? new HttpHeaders(options.headers) : options.headers;
    }
    // if (options.params) {
    //   params = new HttpParams();

    //   for (const propKey of Object.keys(options.params).sort()) {
    //     if (options.params[propKey] !== undefined) {
    //       if (Array.isArray(options.params[propKey])) {
    //         options.params[propKey].forEach((item) => {
    //           params = params.append(`${propKey}[]`, item == null ? 'NULL' : item.toString());
    //         });
    //       } else {
    //         params = params.append(propKey, options.params[propKey] == null ? 'NULL' : options.params[propKey].toString());
    //       }
    //     }
    //   }
    // }

    return { ...options, params, headers };
  }

  return;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private readonly httpClient: HttpClient, 
        private env: EnvironmentService,
        private router: Router
    ){
        console.log('ENV : ', env.urlAddress);
    }

    makeUrl(url: string): string {
        return url.indexOf('http') === 0 ? url : `${this.env.urlAddress}/${url}`;
    }

    get<T = void>(url: string, options?: Partial<ApiRequestOptions>): Observable<T> {
        // console.log('options: ', getApiRequestOptions(options))
        return this.httpClient.get<T>(
                this.makeUrl(url), 
                getApiRequestOptions(options)
            )
            .pipe(catchError(this.errorHandler));
    }

    post<T = void>(url: string, body?: unknown | null, options?: Partial<ApiRequestOptions>): Observable<T> {
        return this.httpClient.post<T>(
                this.makeUrl(url), 
                body ?? null, 
                getApiRequestOptions(options)
            )
            .pipe(catchError(this.errorHandler));
    }

    patch<T = void>(url: string, body: unknown | null, options?: Partial<ApiRequestOptions>): Observable<T> {
        return this.httpClient.patch<T>(
                this.makeUrl(url), body, getApiRequestOptions(options)
            )
            .pipe(catchError(this.errorHandler));
    }

    put<T = void>(url: string, body: unknown | null, options?: Partial<ApiRequestOptions>): Observable<T> {
        return this.httpClient.put<T>(
                this.makeUrl(url), 
                body, 
                getApiRequestOptions(options)
            )
            .pipe(catchError(this.errorHandler));
    }

    delete<T = void>(url: string, options?: Partial<ApiRequestOptions>): Observable<T> {
        return this.httpClient.delete<T>(
                this.makeUrl(url), 
                getApiRequestOptions(options)
                )
                .pipe(catchError(this.errorHandler));
    }

    errorHandler = (error: any) => {
        let handled: boolean = false;
        console.error('[API] catched error: ', error);
        if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
                console.error("[API] Error Event: ");
            } else {
                // console.log(`[API] error status : ${error.status} ${error.statusText}`);
                switch (error.status) {
                    case 401:      //login
                        this.router.navigateByUrl("/login");
                        console.log(`[API] redirect to login`);
                        handled = true;
                        break;
                    case 403:     //forbidden
                        this.router.navigateByUrl("/login");
                        console.log(`[API] redirect to login`);
                        handled = true;
                        break;
                    // 404 throw further
                    // case 404:     
                    //     handled = true;
                    //     console.log(`[API] redirect to 404`);
                    //     this.router.navigate(["/404"]);
                    //     break;
                }
            }
        }
        else {
          console.log("[API] Other Errors");
        }
 
        if (handled) {
            console.log('[API] return back ');
            return of(error);
        } else {
            console.log('[API] throw error back to to the subscriber', error);
            return throwError(() => error);
        }
        // console.log('ERROR STATUS (): ', error.status)
        // let errorMessage = '';
        // if(error.error instanceof ErrorEvent) {
        //     // Get client-side error
        //     errorMessage = error.error.message;
        // } else {
        //     // Get server-side error
        //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        //     switch (error.status) {
        //         // case 401:      //login
        //         //     this.router.navigateByUrl("/login");
        //         //     break;
        //         // case 403:     //forbidden
        //         //     this.router.navigateByUrl("/unauthorized");
        //         //     break;
        //         case 404:     //forbidden
        //             console.log('404')
        //             this.router.navigate(["/404"]);
        //             break;
        //     }
        // }
        // console.log(errorMessage);
        // /////////
        // // TODO: ошибка должна отсылаться разработчику
        // /////////
        // return throwError(() => new Error(errorMessage));
    }
}
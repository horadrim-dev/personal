import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    private currentUserSubject: BehaviorSubject<User|null>;
    public currentUser: Observable<User|null>;
    // public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    constructor(private _api: ApiService, private _env: EnvironmentService) {
        let storedUser = localStorage.getItem('currentUser')
        this.currentUserSubject = new BehaviorSubject<User|null>(storedUser? JSON.parse(storedUser) : null)
        this.currentUser = this.currentUserSubject.asObservable();
        
        // TODO: переделать в случае добавления пользовательской авторизации
        // this.currentUserSubject.subscribe(x => this.isLoggedIn.next(x ? true : false))
        this.currentUserSubject.subscribe(x => this.isAdmin.next(x ? true : false))
    }

    public get isLoggedIn(): boolean{
        return this.currentUserValue? true : false
    }

    public get currentUserValue(): User|null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this._api.post<any>(`${this._env.jwtLogin}`, { username, password })
            .pipe(
                map(response => {
                    // login successful if there's a jwt token in the response
                    let currentUser: User;
                    if (response.access) {
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      currentUser = jwtDecode(response.access)
                      currentUser.token = response.access
                      currentUser.refreshToken = response.refresh
                      localStorage.setItem('currentUser', JSON.stringify(currentUser));
                      this.currentUserSubject.next(currentUser);
                      console.log(JSON.stringify(currentUser));
                      // return currentUser;
                    } 
                    return response
                }),
            )
            // .subscribe( data => console.log('data'), error => console.log('error'))
    }

    refreshToken() {
        // if user is empty - exiting
        // if (!this.currentUserValue) return null

        // console.log('this.currentUserValue.refreshToken')
        // console.log(this.currentUserValue!.refreshToken)

        const refreshToken = this.currentUserValue!.refreshToken
        return this._api.post<any>(`${this._env.jwtRefresh}`, { 'refresh': refreshToken })
            .pipe(
                map(response => {
                    // login successful if there's a jwt token in the response
                    // console.log('refresh')
                    console.log(response)
                    let currentUser: User;
                    if (response.access) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        currentUser = jwtDecode(response.access)
                        currentUser.token = response.access
                        currentUser.refreshToken = response.refresh
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        console.log(currentUser)
                        this.currentUserSubject.next(currentUser);
                      // return currentUser;
                    } 
                    return response
                }),
            )
            // .subscribe( data => console.log('data'), error => console.warn(error))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}

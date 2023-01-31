import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
 
@Injectable()
export class UserService {
 
  // private httpOptions: any;
 
  // // текущий JWT токен
  // public token!: string;
 
  // // время окончания жизни токена
  // public token_expires!: Date;
  // // логин пользователя
  // public username!: string;
 
  // // сообщения об ошибках авторизации
  // public errors: any = [];
 
  // constructor(private http: HttpClient) {
  //   this.httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   };
  // }
 
  // // используем http.post() для получения токена
  // public login(user: any) {
  //   this.http.post('/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe({
  //     next: data => {
  //       this.updateData(data['token']);
  //     },
  //     error: err => {
  //       this.errors = err['error'];
  //     }
  //   });
  // }
 
  // // обновление JWT токена
  // public refreshToken() {
  //   this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
  //     data => {
  //       this.updateData(data['token']);
  //     },
  //     err => {
  //       this.errors = err['error'];
  //     }
  //   );
  // }
 
  // public logout() {
  //   this.token = null;
  //   this.token_expires = null;
  //   this.username = null;
  // }
 
  // private updateData(token) {
  //   this.token = token;
  //   this.errors = [];
 
  //   // декодирование токена для получения логина и времени жизни токена
  //   const token_parts = this.token.split(/\./);
  //   const token_decoded = JSON.parse(window.atob(token_parts[1]));
  //   this.token_expires = new Date(token_decoded.exp * 1000);
  //   this.username = token_decoded.username;
  // }
 
}
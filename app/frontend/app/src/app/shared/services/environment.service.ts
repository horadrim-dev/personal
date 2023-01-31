import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public urlAddress: string = environment.urlAddress;
  public jwtLogin: string = environment.jwtLogin;
  public jwtRefresh: string = environment.jwtRefresh;
  constructor() { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ServerResponse } from '../models/server-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  user_admin: any;


  constructor(
    private http: HttpClient
  ) {
    this.user = null;
    this.user_admin = null;
  }

  isArtist(): boolean {
    return this.user.artistic_name != undefined
  }


  authAndRetrieveUser(username: string, password: string){
    return this.http.post<ServerResponse>(environment.url_api + '/user/auth', {
      username: username, password: password
    });
  }

  // pendiente
  authAndRetrieveAdmin(username: string, password: string){
    return this.http.post<ServerResponse>(environment.url_api + '/user/auth_admin', {
      username: username, password: password
    });
  }

  isLoggedIn(): boolean{
    this.user = JSON.parse(localStorage.getItem("user"));
    return this.user != null && this.user != undefined;
  }
  getLoggedIn(){
    this.user = JSON.parse(localStorage.getItem("user"));
    // console.log(this.user)
    return this.user;
  }

  setCookieLogginUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user))
    // console.log(JSON.parse(localStorage.getItem("user")))
  }

  logOut() {
    localStorage.removeItem("user")
    this.user = null
  }

  isAdminLoggedIn(): boolean{
    this.user_admin = JSON.parse(localStorage.getItem("user_admin"));
    return this.user_admin != null && this.user_admin != undefined;
  }

  setCookieLogginAdmin(user: any) {
    localStorage.setItem("user_admin", JSON.stringify(user))
    // console.log(JSON.parse(localStorage.getItem("user")))
  }

  logOutAdmin() {
    localStorage.removeItem("user_admin")
    this.user_admin = null
  }
  
}

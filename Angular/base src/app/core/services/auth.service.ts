import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerResponse } from '../models/server-response.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  user_admin: any;

  private is_logged_in = new BehaviorSubject<boolean>(false);

  is_logged_in$ = this.is_logged_in.asObservable(); // tipo observable sdfs$


  constructor(
    private http: HttpClient
  ) {
    this.user = null;
    this.user_admin = null;
    this.is_logged_in.next(this.isLoggedIn());
  }

  authAndRetrieveUser(username: string, password: string){
    /*return this.http.post<ServerResponse>(environment.url_api + '/user/auth', {
      username: username, password: password
    });*/
    var response: ServerResponse = {
      id_message: 1,
      server_message: "Ok",
      metadata: "7",
      data: [],
      error: ""
    }

    return of(response)
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
    this.is_logged_in.next(true);
  }

  logOut() {
    localStorage.removeItem("user")
    this.user = null
    this.is_logged_in.next(false);
  }

  
}

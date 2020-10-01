import { MyFunction } from './../models/myfunction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServerResponse } from '../models/server-response.model';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  route: string = "/functions";

  objectEdit: MyFunction;

  constructor(
    private http: HttpClient
  ) {
    this.objectEdit = null;
  }

  getAllBySkipStep(skip: number, step: number){
    return this.http.post<ServerResponse>(environment.url_api_gate, {
      route: this.route, filename: "",
      skip: skip, step: step
    });
  }

  search(search_method: number, search_value: number){
    return this.http.post<ServerResponse>(environment.url_api_gate, {
      route: this.route, filename: "",
      search_method: search_method, search_value: search_value
    });
  }

  delete(id: number){
    return this.http.post<ServerResponse>(environment.url_api_gate, {
      route: this.route, filename: "",
      id: id
    });
  }
}

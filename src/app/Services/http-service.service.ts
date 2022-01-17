import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
const baseURL = 'https://localhost:44397/api/Employee/';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient: HttpClient) { }
  getAll(type : any): Observable<any> {
    return this.httpClient.get(baseURL+"GetAll?type="+type);
  }

  getById(id:any): Observable<any> {
    return this.httpClient.get(baseURL+"GetById?Id="+id);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post(baseURL+"Add", data);
  }

  update(data: any): Observable<any> {
    return this.httpClient.put(`${baseURL+"Edit"}`, data);
  }

  delete(id:any): Observable<any> {
    return this.httpClient.delete(`${baseURL+"Delete?Id="}${id}`);
  }

}
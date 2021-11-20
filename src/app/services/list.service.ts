import { Injectable } from '@angular/core';
import {List} from "../interfaces/list";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private lists: List[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>("http://localhost:3000/lists");
  }

  getList(id:number): Observable<List>{
    return this.httpClient.get<List>("http://localhost:3000/lists/" + id);
  }

  addList(list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<List>("http://localhost:3000/lists", list, {headers: headers});
  }
}

import { Injectable } from '@angular/core';
import {List} from "../interfaces/list";
import {Task} from "../interfaces/task";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private lists: List[] = [];

  private listSource = new BehaviorSubject<List>({id:0, completed:"", title:"", color:""});
  selectedList = this.listSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  setSelectedList(list: List): Observable<List> {
    this.listSource.next(list)
    return this.selectedList;
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

  editList(id:number, list: List): Observable<List> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<List>("http://localhost:3000/lists/" + id, list, {headers: headers});
  }

  deleteList(id: number): Observable<List> {
    return this.httpClient.delete<List>("http://localhost:3000/lists/" + id);
  }
}

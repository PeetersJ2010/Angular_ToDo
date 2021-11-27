import { Injectable } from '@angular/core';
import {Task} from "../interfaces/task";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {List} from "../interfaces/list";
import {DatePipe} from "@angular/common";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient) {
  }

  pollAllTasks(): Observable<Task[]>{
    return timer(1, 2000).pipe(switchMap(() => this.httpClient.get<Task[]>("http://localhost:3000/tasks?_expand=list")));
  }

  getTasksByCompleted(id: number): Observable<Task[]>{
    return this.httpClient.get<Task[]>("http://localhost:3000/tasks?listId=" + id.toString() +"&_sort=completed&_order=asc")
  }

  editTask(id:number, task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Task>("http://localhost:3000/tasks/" + id, task, {headers: headers});
  }

  addTask(task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Task>("http://localhost:3000/tasks", task, {headers: headers});
  }

  deleteTask(id: number): Observable<Task> {
    return this.httpClient.delete<Task>("http://localhost:3000/tasks/" + id);
  }

}

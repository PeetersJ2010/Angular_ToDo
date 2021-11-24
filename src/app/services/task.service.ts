import { Injectable } from '@angular/core';
import {Task} from "../interfaces/task";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {List} from "../interfaces/list";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getTodaysTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>("http://localhost:3000/tasks");
  }

  getAllTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>("http://localhost:3000/tasks");
  }

  getTasks(id: number): Observable<Task[]>{
    return this.httpClient.get<Task[]>("http://localhost:3000/tasks?listId=" + id.toString())
  }

  editTask(id:number, task: Task): Observable<Task> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Task>("http://localhost:3000/tasks/" + id, task, {headers: headers});
  }
}

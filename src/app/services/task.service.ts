import { Injectable } from '@angular/core';
import {Task} from "../interfaces/task";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getTasks(id: number): Observable<Task[]>{
    return this.httpClient.get<Task[]>("http://localhost:3000/tasks?listId=" + id.toString())
  }
}

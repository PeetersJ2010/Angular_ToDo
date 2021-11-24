import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListTaskService {

  private messageSource = new BehaviorSubject(false);
  reloadLists = this.messageSource.asObservable();

  changeState(message: boolean): Observable<any> {
    this.messageSource.next(message)
    return this.reloadLists;
  }

  constructor() { }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListTaskService {

  private reloadListsSource = new BehaviorSubject(false);
  reloadLists = this.reloadListsSource.asObservable();

  private editListsSource = new BehaviorSubject(false);
  editLists = this.editListsSource.asObservable();

  changeState(message: boolean): Observable<any> {
    this.reloadListsSource.next(message)
    return this.reloadLists;
  }

  editList(message: boolean): Observable<any>{
    this.editListsSource.next(message);
    return this.editLists;
  }

  constructor() { }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {List} from 'src/app/interfaces/list';
import {ListService} from 'src/app/services/list.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {AddListComponent} from "../crud/add-list/add-list.component";

@Component({
  selector: 'app-main-list-list',
  templateUrl: './main-list-list.component.html',
  styleUrls: ['./main-list-list.component.scss']
})
export class MainListListComponent implements OnInit {
  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();
  bsModalRef: BsModalRef = new BsModalRef();

  public selectedList: Observable<List> = new Observable<List>();

  errorMessage: string = '';
  listOrder = "Ascending";
  color = "red";
  prevId: number = -1;

  constructor(private listService: ListService, private router: Router, private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.getLists();
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
  }

  addNewList() {
    this.bsModalRef = this.bsModalService.show(AddListComponent);
    this.bsModalRef.content.event.subscribe((result:String) => {
      if (result == 'OK') {
        this.getLists();
      }
    });
  }

  // add() {
  //   //Navigate to form in add mode
  //   this.router.navigate(['admin/status/form'], {state: {mode: 'add'}});
  // }
  //
  // edit(id: number) {
  //   //Navigate to form in edit mode
  //   this.router.navigate(['admin/status/form'], {state: {id: id, mode: 'edit'}});
  // }

  // delete(id: number) {
  //   this.deleteList$ = this.listService.deleteList(id).subscribe(result => {
  //     //all went well
  //     this.getLists();
  //   }, error => {
  //     //error
  //     this.errorMessage = error.message;
  //   });
  // }

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => this.lists = result);
  }

  sortLists(){
    if (this.listOrder == "Ascending"){
      this.listOrder = "Descending";
      this.lists.sort((x, y) => (x.title > y.title ? -1 : 1));
    }
    else{
      this.listOrder = "Ascending";
      this.lists.sort((y, x) => (x.title > y.title ? -1 : 1));
    }
  }

  detail(id: number) {
    // Set styles
    let selected = document.getElementById(id.toString());
    if (this.prevId != -1){
      let prevSelected = document.getElementById(this.prevId.toString());
      prevSelected!.className = 'd-flex align-items-center list noSelect';
    }
    selected!.className = 'd-flex align-items-center list noSelect selected';
    this.prevId = id;

    // Clear the task list component
    this.router.navigate(['/'])

    // Load the correct component after 10 ms
    setTimeout(()=>{
      this.router.navigate(['/', id]);
    }, 10);
  }
}

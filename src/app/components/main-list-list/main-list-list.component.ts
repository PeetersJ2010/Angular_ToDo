import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {List} from 'src/app/interfaces/list';
import {ListService} from 'src/app/services/list.service';
import {BsModalService, BsModalRef} from "ngx-bootstrap/modal";
import {AddListComponent} from "../crud/add-list/add-list.component";
import {ListTaskService} from "../../services/list-task.service";
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-main-list-list',
  templateUrl: './main-list-list.component.html',
  styleUrls: ['./main-list-list.component.scss']
})
export class MainListListComponent implements OnInit {
  lists: List[] = [];
  lists$: Subscription = new Subscription();
  editList$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();
  reloadList$: Subscription = new Subscription();
  editListCompleted$: Subscription = new Subscription();
  bsModalRef: BsModalRef = new BsModalRef();

  listOrder = "Color";
  prevId: number = -1;

  constructor(private listService: ListService, private router: Router, private bsModalService: BsModalService, private listTaskService: ListTaskService, private taskService: TaskService) {
    this.reloadList$ = this.listTaskService.reloadLists.subscribe((state: boolean) => {
      this.getLists();
    });
    this.editListCompleted$ = this.listTaskService.editLists.subscribe((state: boolean) => {
      this.getListsAfterUpdate();
    });
  }

  ngOnInit(): void {
  }

  addNewList() {
    this.bsModalRef = this.bsModalService.show(AddListComponent);
    this.bsModalRef.content.editMode = false;
    this.bsModalRef.content.event.pipe(take(1)).subscribe((result: String) => {
      if (result == 'OK') {
        this.getLists();
        setTimeout(() => {
          let currentId = this.router.url.substring(1)
          this.selectListElement(+currentId);
          this.prevId = +currentId;
        }, 100);

        setTimeout(() => {
          this.bsModalRef.content.event.unsubscribe();
        }, 2000);
      }
    });
  }

  selectListElement(id: number) {
    // Select the current list in the lists list
    let listElement = document.getElementById(id.toString());
    if (listElement != null){
      listElement!.className = 'd-flex align-items-center list noSelect selected';
    }
  }

  getLists() {
    if(this.listOrder == "Color"){
      this.lists$ = this.listService.getListsByColor().pipe(take(1)).subscribe(result => {
        this.lists = result;
      });
    }else{
      this.lists$ = this.listService.getListsByTitle().pipe(take(1)).subscribe(result => {
        this.lists = result;
      });
    }
  }

  getListsAfterUpdate(){
    this.getLists();
    //Call only when editing
    setTimeout(() => {
      if (this.prevId != -1) this.selectListElement(this.prevId);
    }, 100);
  }

  sortLists() {
    if (this.listOrder == "Color") {
      this.listOrder = "Title";
      this.getLists();
    } else {
      this.listOrder = "Color";
      this.getLists();
    }
  }

  detail(id: number) {
    let selected = document.getElementById(id.toString());
    if (this.prevId != -1) {
      let prevSelected = document.getElementById(this.prevId.toString());
      if (prevSelected != null) {
        prevSelected!.className = 'd-flex align-items-center list noSelect';
      }
    }
    selected!.className = 'd-flex align-items-center list noSelect selected';
    this.prevId = id;

    // Clear the task list component
    this.router.navigate(['/']);

    // Load the correct component after 10 ms
    setTimeout(() => {
      this.router.navigate(['/', id]);
    }, 10);
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
    this.reloadList$.unsubscribe();
    this.editList$.unsubscribe();
  }
}

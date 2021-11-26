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
  prevId$: Subscription = new Subscription();
  bsModalRef: BsModalRef = new BsModalRef();

  listOrder = "Ascending";
  prevId: number = -1;

  constructor(private listService: ListService, private router: Router, private bsModalService: BsModalService, private listTaskService: ListTaskService, private taskService: TaskService) {
    this.reloadList$ = this.listTaskService.reloadLists.subscribe((state: boolean) => {
      setTimeout(() => {
        this.getLists();
      }, 100);
      this.reloadList$.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.getLists();
    // this.getTasks();
  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
    this.reloadList$.unsubscribe();
    this.prevId$.unsubscribe();
    this.editList$.unsubscribe();
    //this.bsModalRef.content.event.unsubscribe();
  }

  addNewList() {
    this.bsModalRef = this.bsModalService.show(AddListComponent);
    this.bsModalRef.content.editMode = false;
    this.bsModalRef.content.event.subscribe((result: String) => {
      if (result == 'OK') {
        this.getLists();
        setTimeout(() => {
          let currentId = this.router.url.substring(1)
          this.selectListElement(currentId);
          this.prevId = +currentId;
        }, 100);

        this.bsModalRef.content.event.unsubscribe();
      }
    });
  }

  selectListElement(id: string) {
    // Select the current list in the lists list
    let listElement = document.getElementById(id);
    listElement!.className = 'd-flex align-items-center list noSelect selected';
  }

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => {
      this.lists = result;
      // this.setCompletedTasks();
      this.lists$.unsubscribe();
    });

    // Call only when editing
    // setTimeout(() => {
    //   if (this.prevId != -1) this.selectListElement(this.prevId.toString());
    // }, 100);

  }

  // getTasks() {
  //   this.tasks$ = this.taskService.getAllTasks().subscribe(result => {
  //     this.tasks = result;
  //     // this.setCompletedTasks();
  //   });
  // }


  sortLists() {
    if (this.listOrder == "Ascending") {
      this.listOrder = "Descending";
      this.lists.sort((x, y) => (x.title > y.title ? -1 : 1));
    } else {
      this.listOrder = "Ascending";
      this.lists.sort((y, x) => (x.title > y.title ? -1 : 1));
    }
  }

  detail(id: number) {
    // Set styles
    let selected = document.getElementById(id.toString());
    if (this.prevId != -1) {
      let prevSelected = document.getElementById(this.prevId.toString());
      if (prevSelected != null){
        prevSelected!.className = 'd-flex align-items-center list noSelect';
      }
    }
    selected!.className = 'd-flex align-items-center list noSelect selected';
    this.prevId = id;

    // Clear the task list component
    this.router.navigate(['/'])

    // let list = this.lists.find(element => element.id == id)!;
    // this.listService.setSelectedList(list);

    // Load the correct component after 10 ms
    setTimeout(() => {
      this.router.navigate(['/', id]);
    }, 10);
  }


}

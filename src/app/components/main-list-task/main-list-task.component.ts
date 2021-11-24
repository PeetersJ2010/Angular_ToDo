import {Component, HostListener, Input, OnInit} from '@angular/core';
import {List} from 'src/app/interfaces/list';
import {Task} from 'src/app/interfaces/task';
import {TaskService} from "../../services/task.service";
import {Subscription} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DeleteListComponent} from "../crud/delete-list/delete-list.component";
import {Event, Router} from "@angular/router";
import {ListTaskService} from "../../services/list-task.service";
import {AddListComponent} from "../crud/add-list/add-list.component";
import {ListService} from "../../services/list.service";

@Component({
  selector: 'app-main-list-task',
  templateUrl: './main-list-task.component.html',
  styleUrls: ['./main-list-task.component.scss']
})
export class MainListTaskComponent implements OnInit {
  @Input() list: List = {id: -1, completed: "", title: "", color: ""}
  tasks: Task[] = [];
  tasks$: Subscription = new Subscription();
  taskOrder = "Ascending";
  bsModalRef: BsModalRef = new BsModalRef();
  editTask$: Subscription = new Subscription();
  editList$: Subscription = new Subscription();

  // If the tasks list is empty, this variable is set to true (So it doesnt flicker when switching lists :) )
  isEmpty = false;

  constructor(private taskService: TaskService, private bsModalService: BsModalService, private router: Router, private listTaskService: ListTaskService, private listService: ListService) {
    // this.listTaskService.reloadLists.subscribe((state:boolean) => {});
  }

  ngOnInit(): void {
    this.waitForList();
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.tasks$.unsubscribe();
    this.editTask$.unsubscribe();
    this.editList$.unsubscribe();
  }

  setCompleted(id: number, task: Task, list: List){
    // Update the task
    this.editTask$ = this.taskService.editTask(id, task).subscribe();

    if (this.tasks.length > 0){
      let totalTasks = this.tasks.length;
      let completedTasks = 0;
      for(let task of this.tasks){
        if (task.completed){
          completedTasks ++;
        }
      }
      list.completed = completedTasks.toString() + "/" + totalTasks.toString()
    }else{
      // No tasks found
      list.completed = "0/0";
    }
    // Update the list
    this.editList$ = this.listService.editList(task.listId, list).subscribe();

    // Update the lists in the list-list component
    this.listTaskService.changeState(true);
  }

  deleteList() {
    this.bsModalRef = this.bsModalService.show(DeleteListComponent);
    this.bsModalRef.content.listId = this.list.id;
    this.bsModalRef.content.title = this.list.title;
    this.waitUntilDone();
  }

  editList() {
    this.bsModalRef = this.bsModalService.show(AddListComponent);
    this.bsModalRef.content.list = this.list;
    this.bsModalRef.content.editMode = true;
    this.bsModalRef.content.listTitle = this.list.title;
    this.waitUntilDone();
  }

  // Waits until the users is done using the modal and reloads the lists list
  waitUntilDone() {
    this.bsModalRef.content.event.subscribe((result: String) => {
      if (result == 'OK') {
        // Reload lists
        this.listTaskService.changeState(true);
        this.router.navigate(['/']);
      }
    });
  }

  // Recursive function that waits until the list is received from the API
  waitForList() {
    let count: number;
    setTimeout(() => {
      if (this.list.id == -1) {
        count++;
        if (count > 200) throw ("List not found!")
        this.waitForList();
      } else {
        this.getTasks();
      }
    }, 10)
  }

  getTasks() {
    if (this.list.id != -1) {
      this.tasks$ = this.taskService.getTasks(this.list.id).subscribe(result => {
        this.tasks = result;
        if (this.tasks.length == 0){
          this.isEmpty = true;
        }
      });
    }
  }

  sortTasks() {
    if (this.taskOrder == "Ascending") {
      this.taskOrder = "Descending";
      this.tasks.sort((x, y) => (x.title > y.title ? -1 : 1));
    } else {
      this.taskOrder = "Ascending";
      this.tasks.sort((y, x) => (x.title > y.title ? -1 : 1));
    }
  }
}

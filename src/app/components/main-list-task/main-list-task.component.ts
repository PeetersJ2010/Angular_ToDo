import {Component, HostListener, Input, OnInit} from '@angular/core';
import {List} from 'src/app/interfaces/list';
import {Task} from 'src/app/interfaces/task';
import {TaskService} from "../../services/task.service";
import {Subscription} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DeleteListComponent} from "../crud/delete-list/delete-list.component";
import {ActivatedRoute, Event, Router} from "@angular/router";
import {ListTaskService} from "../../services/list-task.service";
import {AddListComponent} from "../crud/add-list/add-list.component";
import {ListService} from "../../services/list.service";
import {AddTaskComponent} from "../crud/add-task/add-task.component";
import {take} from "rxjs/operators";
import {DeleteTaskComponent} from "../crud/delete-task/delete-task.component";

@Component({
  selector: 'app-main-list-task',
  templateUrl: './main-list-task.component.html',
  styleUrls: ['./main-list-task.component.scss']
})
export class MainListTaskComponent implements OnInit {
  @Input() list: List = {id: -1, completed: "", title: "", color: ""}
  tasks: Task[] = [];
  tasks$: Subscription = new Subscription();
  bsModalRef: BsModalRef = new BsModalRef();
  editTask$: Subscription = new Subscription();
  editList$: Subscription = new Subscription();

  // If the tasks list is empty, this variable is set to true (So it doesnt flicker when switching lists :) )
  isEmpty = false;
  // Filter option
  taskOrder = "Completed";

  constructor(private taskService: TaskService, private bsModalService: BsModalService, private route: ActivatedRoute, private router: Router, private listTaskService: ListTaskService, private listService: ListService) {
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

  // Adds a new task, opens the addTask modal, then waits for a response.
  addNewTask() {
    this.bsModalRef = this.bsModalService.show(AddTaskComponent);
    this.bsModalRef.content.editMode = false;
    this.bsModalRef.content.task.listId = this.list.id;
    this.bsModalRef.content.event.pipe(take(1)).subscribe((result: String) => {
      if (result == 'OK') {
        this.isEmpty = false;
        // Get tasks
        this.tasks$ = this.taskService.getTasksByCompleted(this.list.id).pipe(take(1)).subscribe(result => {
          this.tasks = result;
          if (this.tasks.length == 0) {
            this.isEmpty = true;
          }
          setTimeout(() => {
            this.calculateCompleted();
          }, 100);
        });
      }
      setTimeout(() => {
        this.bsModalRef.content.event.unsubscribe();
      }, 1000);
    });
  }

  setCompleted(id: number, task: Task, list: List) {
    // Update the task
    this.editTask$ = this.taskService.editTask(id, task).pipe(take(1)).subscribe();
    this.calculateCompleted();
  }

  // This functions calculates the string value for list.completed (eg. 0/1, 2/3, ...)
  calculateCompleted() {
    if (this.tasks.length > 0) {
      let totalTasks = this.tasks.length;
      let completedTasks = 0;
      for (let task of this.tasks) {
        if (task.completed) {
          completedTasks++;
        }
      }
      this.list.completed = completedTasks.toString() + "/" + totalTasks.toString()
      console.log(this.list.completed)
    } else {
      // No tasks found
      this.list.completed = "0/0";
    }
    // Update the list
    this.editList$ = this.listService.editList(this.list.id, this.list).pipe(take(1)).subscribe(r => {
      // Update the lists in the list-list component
      this.listTaskService.editList(true);
      this.getTasks();
    });
  }

  deleteList() {
    this.bsModalRef = this.bsModalService.show(DeleteListComponent);
    this.bsModalRef.content.listId = this.list.id;
    this.bsModalRef.content.title = this.list.title;
    this.bsModalRef.content.event.pipe(take(1)).subscribe((result: String) => {
      if (result == 'OK') {
        this.router.navigate(['/']);
        // Reload lists
        this.listTaskService.changeState(true);
      }
      setTimeout(() => {
        this.bsModalRef.content.event.unsubscribe();
      }, 1000);
    });
  }

  deleteTask(task: Task) {
    this.bsModalRef = this.bsModalService.show(DeleteTaskComponent);
    this.bsModalRef.content.taskId = task.id;
    this.bsModalRef.content.title = task.title;
    this.bsModalRef.content.event.pipe(take(1)).subscribe((result: String) => {
      if (result == 'OK') {
        // Reload tasks
        this.tasks$ = this.taskService.getTasksByCompleted(this.list.id).pipe(take(1)).subscribe(result => {
          this.tasks = result;
          if (this.tasks.length == 0) {
            this.isEmpty = true;
          }
          setTimeout(() => {
            this.calculateCompleted();
          }, 100);
        });
      }
      setTimeout(() => {
        this.bsModalRef.content.event.unsubscribe();
      }, 1000);
    });
  }

  editList() {
    let listOld = this.list;
    this.bsModalRef = this.bsModalService.show(AddListComponent);
    this.bsModalRef.content.list = this.list;
    this.bsModalRef.content.editMode = true;
    this.bsModalRef.content.listTitle = this.list.title;
    this.bsModalRef.content.event.pipe(take(1)).subscribe((result: String) => {
      if (result == 'OK') {
        // Reload lists
        this.listTaskService.editList(true);
      } else if (result == 'NOK') {
        this.list = listOld;
      }

      // Refresh list detail
      let listId = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/']);
      setTimeout(() => {
        this.router.navigate(['/', listId]);
      }, 10);

      setTimeout(() => {
        this.bsModalRef.content.event.unsubscribe();
      }, 1000);
    });
  }

  editTask(task: Task) {
    this.bsModalRef = this.bsModalService.show(AddTaskComponent);
    this.bsModalRef.content.task = task;
    this.bsModalRef.content.editMode = true;
    this.bsModalRef.content.taskTitle = task.title;
    this.bsModalRef.content.event.pipe(take(1)).subscribe(() => {
      // Refresh list detail
      let listId = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/']);
      setTimeout(() => {
        this.router.navigate(['/', listId]);
      }, 10);

      setTimeout(() => {
        this.bsModalRef.content.event.unsubscribe();
      }, 1000);
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
    }, 10);
  }

  getTasks() {
    if (this.list.id != -1) {
      this.tasks$ = this.taskService.getTasksByCompleted(this.list.id).pipe(take(1)).subscribe(result => {
        this.tasks = result;
        if (this.tasks.length == 0) {
          this.isEmpty = true;
        } else {
          if (this.taskOrder == "Date") {
            this.tasks.sort((y, x) => (x.deadline.year.toString() + x.deadline.month.toString().padStart(2, '0') + x.deadline.day.toString().padStart(2, '0') > y.deadline.year.toString() + y.deadline.month.toString().padStart(2, '0') + y.deadline.month.toString().padStart(2, '0') ? -1 : 1));
          }
          // Check if task due date has passed, if so: apply style
          setTimeout(() => {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            let fullDateToday = yyyy + mm + dd;
            for (let task of this.tasks) {
              let taskElement = document.getElementById(task.listId.toString() + task.id.toString());
              if(!task.completed){
                let fullDateTask = task.deadline.year.toString() + task.deadline.month.toString().padStart(2, '0') + task.deadline.day.toString().padStart(2, '0');
                // Task due date has passed
                if (fullDateTask < fullDateToday) {
                  taskElement!.className = 'rounded pl-1 d-flex align-items-center justify-content-between task-passed';
                }
                // Due today
                if (fullDateTask == fullDateToday) {
                  taskElement!.className = 'rounded pl-1 d-flex align-items-center justify-content-between task-due-today';
                }
              }else{
                // Task is completed
                taskElement!.className = 'rounded pl-1 d-flex align-items-center justify-content-between task-completed';
              }
            }
          }, 100);
        }
      });
    }
  }

  sortTasksButton() {
    if (this.taskOrder == "Completed") {
      this.taskOrder = "Date";
      this.getTasks();
    } else {
      this.taskOrder = "Completed";
      this.getTasks();
    }
  }
}

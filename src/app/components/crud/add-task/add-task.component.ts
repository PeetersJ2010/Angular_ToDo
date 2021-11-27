import {Component, EventEmitter, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../../../services/task.service";
import {Task} from "../../../interfaces/task";
import {BsModalRef} from "ngx-bootstrap/modal";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  addTask$: Subscription = new Subscription();
  editTask$: Subscription = new Subscription();
  event: EventEmitter<any> = new EventEmitter();

  editMode = false;
  isSubmitted: boolean = false;
  errorMessage: string = "";
  task: Task = {id: 0, listId: 0, title: "", completed: false, deadline: {day: 1,  month: 1, year: 2021 }};

  today = new Date();
  day: number = 0;
  month: number = 0;
  year: number = 0;

  constructor(private taskService: TaskService, private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.task.deadline.day = this.day = this.today.getDate();
    this.task.deadline.month = this.month = this.today.getMonth() + 1;
    this.task.deadline.year = this.year = this.today.getFullYear();
  }

  onClose() {
    this.emitNok()
  }

  onTaskFormSubmit() {
    this.isSubmitted = true;
    if (!this.editMode) {
      this.addTask$ = this.taskService.addTask(this.task).pipe(take(1)).subscribe(() => {
          this.emitOk()
        },
        error => {
          this.errorMessage = error.message;
        });
    } else {
      this.editTask$ = this.taskService.editTask(this.task.id, this.task).subscribe(() => {
        this.emitOk()
        },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

  // Emits a string value 'OK' to let the parent component know the form was submitted
  emitOk(){
    this.event.emit('OK');
    this.bsModalRef.hide();
    setTimeout(() => {
      this.bsModalRef.content.event.unsubscribe();
    }, 1000);
  }

  // Emits a string value 'NOK' to let the parent component know the form was NOT submitted
  emitNok(){
    this.event.emit('NOK');
    this.bsModalRef.hide();
    setTimeout(() => {
      this.event.unsubscribe();
    }, 1000);
  }

  ngOnDestroy() {
    this.addTask$.unsubscribe();
    this.editTask$.unsubscribe();
    this.event.unsubscribe();
  }
}

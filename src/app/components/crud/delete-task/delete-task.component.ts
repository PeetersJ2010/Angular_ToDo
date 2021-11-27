import {Component, EventEmitter, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Task} from "../../../interfaces/task";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ListService} from "../../../services/list.service";
import {TaskService} from "../../../services/task.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  taskId: number = 0;
  title: String = "";
  deleteTask$: Subscription = new Subscription();
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  deleteTask(taskId: number) {
    // Delete the task
    this.deleteTask$ = this.taskService.deleteTask(taskId).pipe(take(1)).subscribe(() => {
      this.event.emit('OK');
      this.bsModalRef.hide();

      setTimeout(() => {
        this.event.unsubscribe();
      }, 2000);
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnDestroy(): void{
    this.deleteTask$.unsubscribe();
    this.bsModalRef.content.event.unsubscribe();
    this.event.unsubscribe();
  }

}

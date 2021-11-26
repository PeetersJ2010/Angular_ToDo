import {Component, EventEmitter, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../../../services/task.service";
import {Task} from "../../../interfaces/task";
import {BsModalRef} from "ngx-bootstrap/modal";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

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
  task: Task = {id: 0, listId:0, title: "", completed: false, deadline:{year: 2021, month: 1, day: 1}};

  constructor(private taskService: TaskService, private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.addTask$.unsubscribe();
    this.editTask$.unsubscribe();
  }

  onClose() {
    this.bsModalRef.hide();
  }

  onTaskFormSubmit(){
    this.isSubmitted = true;
    if (!this.editMode){
      this.addTask$ = this.taskService.addTask(this.task).subscribe(result => {
          this.event.emit('OK');
          this.bsModalRef.hide();
          this.addTask$.unsubscribe();
        },
        error => {
          this.errorMessage = error.message;
        });
    }else{
      // this.editList$ = this.listService.editList(this.list.id, this.list).subscribe(result => {
      //     this.event.emit('OK');
      //     this.bsModalRef.hide();
      //
      //     // Clear the task list component
      //     this.router.navigate(['/']);
      //
      //     // Load the correct component after 10 ms
      //     setTimeout(()=>{
      //       this.router.navigate(['/', result.id]);
      //     }, 10);
      //   },
      //   error => {
      //     this.errorMessage = error.message;
      //   });
    }
  }

}

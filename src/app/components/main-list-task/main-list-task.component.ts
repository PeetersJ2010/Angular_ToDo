import {Component, HostListener, Input, OnInit} from '@angular/core';
import {List} from 'src/app/interfaces/list';
import {Task} from 'src/app/interfaces/task';
import {TaskService} from "../../services/task.service";
import {Subscription} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DeleteListComponent} from "../crud/delete-list/delete-list.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-list-task',
  templateUrl: './main-list-task.component.html',
  styleUrls: ['./main-list-task.component.scss']
})
export class MainListTaskComponent implements OnInit {
  @Input() list: List = {id:-1, completed:false, title:"", color:""}
  tasks: Task[] = [];
  tasks$: Subscription = new Subscription();
  taskOrder = "Ascending";
  bsModalRef: BsModalRef = new BsModalRef();

  constructor(private taskService:TaskService, private bsModalService: BsModalService, private router: Router) {
  }
  ngOnInit(): void {
    this.waitForList();
  }
  ngOnDestroy(): void{
    this.tasks$.unsubscribe();
  }

  deleteList(listId: number, title: String) {
    console.log(listId);
    this.bsModalRef = this.bsModalService.show(DeleteListComponent);
    this.bsModalRef.content.listId = listId;
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.event.subscribe((result:String) => {
      if (result == 'OK') {
        // Clear the task list component
        this.router.navigate(['/']);
      }
    });
  }

  // Recursive function that waits until the list is received from the API
  waitForList(){
    let count:number;
    setTimeout(()=>{
      if (this.list.id == -1){
        count++;
        if (count > 200) throw ("List not found!")
        this.waitForList();
      }else{
        this.getTasks();
      }
    },10)
  }

  getTasks(){
    if(this.list.id != -1){
      this.tasks$ = this.taskService.getTasks(this.list.id).subscribe(result => this.tasks = result);
    }
  }

  sortTasks(){
    if (this.taskOrder == "Ascending"){
      this.taskOrder = "Descending";
      this.tasks.sort((x, y) => (x.title > y.title ? -1 : 1));
    }
    else{
      this.taskOrder = "Ascending";
      this.tasks.sort((y, x) => (x.title > y.title ? -1 : 1));
    }
  }
}

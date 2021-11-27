import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../interfaces/task";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tasks: Task[] = [];
  tasks$ : Subscription = new Subscription();

  constructor(private taskService: TaskService) { }

  name:String = "Joppe";
  isShortened: boolean = false;
  totalLength: number = 0;

  ngOnInit(): void {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.tasks$ = this.taskService.pollAllTasks().subscribe(result => {
      this.tasks = result.filter(t => t.deadline.day == +dd && t.deadline.month == +mm && t.deadline.year == yyyy && !t.completed);
      this.totalLength = this.tasks.length;
      if (this.tasks.length > 4){
        this.tasks = this.tasks.slice(0, 4)
        this.isShortened = true;
      }else{
        this.isShortened = false;
      }
    });
  }

  ngOnDestroy(): void{
    this.tasks$.unsubscribe();
  }
}

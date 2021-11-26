import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../interfaces/task";
import {Subscription} from "rxjs";


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

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTodaysTasks().subscribe(result => {
      this.tasks = result;
      this.tasks$.unsubscribe();
    } );
  }

  ngOnDestroy(): void{
    this.tasks$.unsubscribe();
  }
}

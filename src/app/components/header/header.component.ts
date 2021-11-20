import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../interfaces/task";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) { }

  name:String = "Joppe";

  ngOnInit(): void {
    this.taskService.getTodaysTasks().subscribe(result => this.tasks = result);
  }
}

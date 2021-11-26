import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../../interfaces/task";

@Component({
  selector: 'app-header-tasks',
  templateUrl: './header-tasks.component.html',
  styleUrls: ['./header-tasks.component.scss']
})
export class HeaderTasksComponent implements OnInit {
  @Input() task: Task = {id:0, listId:0, completed:false, title:"",deadline:{year: 2021, month: 1, day: 1}}


  constructor() { }

  ngOnInit(): void {

  }

}

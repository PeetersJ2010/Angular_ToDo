import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../../services/task.service";
import {Task} from 'src/app/interfaces/task';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit {

  taskListToday: Task[] = [];
  taskListTomorrow: Task[] = [];
  taskListLater: Task[] = [];

  tasks$ : Subscription = new Subscription()

  totalTasks: number = 10;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {


    this.tasks$ = this.taskService.pollAllTasks().subscribe(result => {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let daysInMonth = new Date(yyyy, +mm + 1, 0).getDate();

      this.taskListToday = result.filter(t => t.deadline.day == +dd && t.deadline.month == +mm && t.deadline.year == yyyy && !t.completed);
      // Set to the first of the next month if today is the end of the month.
      if (+dd == daysInMonth){
        dd = "01";
        if (+mm == 12){
          mm = "01";
        }else{
          mm = String(today.getMonth() + 2).padStart(2, '0');
        }
      }else{
        dd = String(today.getDate() + 1).padStart(2, '0');
      }
      this.taskListTomorrow = result.filter(t => t.deadline.day == +dd && t.deadline.month == +mm && t.deadline.year == yyyy && !t.completed);
      this.taskListLater = result.filter(t => (yyyy + mm + dd) < t.deadline.year.toString() + t.deadline.month.toString().padStart(2, '0') + t.deadline.day.toString().padStart(2, '0') && !t.completed);
      console.log(this.taskListLater)
    });
  }

  ngOnDestroy(): void {
    this.tasks$.unsubscribe();
  }
}

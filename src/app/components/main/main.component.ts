import { Component, OnInit } from '@angular/core';
import {ListService} from "../../services/list.service";
import {Event, RouterEvent, Router} from "@angular/router";
import {List} from "../../interfaces/list";
import {filter, timeout} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  list: List = {id:0, completed:"", title:"", color:""}
  // showDefault: boolean = false;

  constructor(private listService:ListService, private router: Router) {
    // router.events.pipe(
    //   filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    // ).subscribe((e: RouterEvent) => {
    //   if (!this.showDefault){
    //     this.showDefault = true;
    //     setTimeout(() => {
    //       console.log(e.url);
    //       this.showDefault = e.url == "/";
    //     }, 400);
    //   }
    // });
  }

  ngOnInit(): void {
    // const listId = this.route.snapshot.paramMap.get('id');
    // if (listId != null) {
    //   let listTemp = this.listService.getList(+listId) ?? null;
    //   if(listTemp != null) {
    //     this.listService.getList(+listId).subscribe(result => this.list = result);
    //     console.log(this.list)
    //   }
    // }
  }

}

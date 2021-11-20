import { Component, OnInit } from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";
import {List} from "../../interfaces/list";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  list: List = {id:0, completed:false, title:"fg", color:""}
  constructor(private listService:ListService, private route: ActivatedRoute) { }

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

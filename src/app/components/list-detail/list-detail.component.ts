import {Component, HostListener, OnInit} from '@angular/core';
import {List} from "../../interfaces/list";
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list: List = {id:-1, completed:false, title:"", color:""}
  constructor(private listService:ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId != null) {
      let listTemp = this.listService.getList(+listId) ?? null;
      if(listTemp != null) {
        this.listService.getList(+listId).subscribe(result => this.list = result);
      }
    }
  }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {List} from "../../interfaces/list";
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list: List = {id:-1, completed:"", title:"", color:""}
  list$ : Subscription = new Subscription();

  constructor(private listService:ListService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId != null) {
      let listTemp = this.listService.getList(+listId) ?? null;
      if(listTemp != null) {
        this.list$ = this.listService.getList(+listId).pipe(take(1)).subscribe(result => {
          this.list = result;
        });
      }
    }
  }

  ngOnDestroy(){
    this.list$.unsubscribe();
  }
}

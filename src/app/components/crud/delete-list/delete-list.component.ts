import {Component, EventEmitter, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ListService} from "../../../services/list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss']
})
export class DeleteListComponent implements OnInit {
  listId: number = 0;
  deleteList$: Subscription = new Subscription();
  title: String = "";
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private listService: ListService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.deleteList$.unsubscribe();
    this.bsModalRef.content.event.unsubscribe();
    this.event.unsubscribe();
  }

  deletePost(listId: number) {
    this.deleteList$ = this.listService.deleteList(listId).subscribe(r => {
      this.event.emit('OK');
      this.bsModalRef.hide();
      this.deleteList$.unsubscribe();
    });

  }

  onClose() {
    this.bsModalRef.hide();
  }

}

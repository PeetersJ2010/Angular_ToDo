import {Component, EventEmitter, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ListService} from "../../../services/list.service";

@Component({
  selector: 'app-delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss']
})
export class DeleteListComponent implements OnInit {
  listId: number = 0;
  title: String = "";
  event: EventEmitter<any> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private listService: ListService) { }

  ngOnInit(): void {
  }

  deletePost(listId: number) {
    this.listService.deleteList(listId).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onClose() {
    this.bsModalRef.hide();
  }

}

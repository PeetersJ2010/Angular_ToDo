import {Component, EventEmitter, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ListService} from "../../../services/list.service";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {TaskService} from "../../../services/task.service";
import {Task} from "../../../interfaces/task";

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


  deleteList(listId: number) {
    // Delete the list
    this.deleteList$ = this.listService.deleteList(listId).pipe(take(1)).subscribe(() => {
      this.event.emit('OK');
      this.bsModalRef.hide();

      setTimeout(() => {
        this.event.unsubscribe();
      }, 2000);
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnDestroy(): void{
    this.deleteList$.unsubscribe();
    this.bsModalRef.content.event.unsubscribe();
    this.event.unsubscribe();
  }

}

import {Component, EventEmitter, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListService} from "../../../services/list.service";
import {Subscription} from "rxjs";
import {List} from "../../../interfaces/list";
import {Task} from "../../../interfaces/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  addList$: Subscription = new Subscription();
  editList$: Subscription = new Subscription();
  colors: String[] = ["red", "green", "blue", "orange"];
  event: EventEmitter<any> = new EventEmitter();

  list:List = {id: 0, completed: "0/0", title: "", color: "red"}
  editMode = false;
  listTitle: String = "";
  isSubmitted: boolean = false;
  errorMessage: string = "";

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.addList$.unsubscribe();
    this.editList$.unsubscribe();
    this.event.unsubscribe();
    this.bsModalRef.content.event.unsubscribe();
  }

  constructor(private listService: ListService, private bsModalRef: BsModalRef, private router: Router) {
  }

  onListFormSubmit() {
    this.isSubmitted = true;
    if (!this.editMode){
      this.addList$ = this.listService.addList(this.list).subscribe(result => {
          this.event.emit('OK');
          this.bsModalRef.hide();

          // Clear the task list component
          this.router.navigate(['/']);

          // Load the correct component after 10 ms
          setTimeout(()=>{
            this.router.navigate(['/', result.id]);
          }, 10);
          this.addList$.unsubscribe();
        },
        error => {
          this.errorMessage = error.message;
        });
    }else{
      this.editList$ = this.listService.editList(this.list.id, this.list).subscribe(result => {
          this.event.emit('OK');
          this.bsModalRef.hide();

          // Clear the task list component
          this.router.navigate(['/']);

          // Load the correct component after 10 ms
          setTimeout(()=>{
            this.router.navigate(['/', result.id]);
          }, 10);
          this.editList$.unsubscribe();
        },
        error => {
          this.errorMessage = error.message;
        });
    }


  }



  onClose() {
    this.bsModalRef.hide();
  }

}

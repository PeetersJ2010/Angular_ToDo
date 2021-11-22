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
  colors: String[] = ["red", "green", "blue", "orange"];
  event: EventEmitter<any> = new EventEmitter();

  list:List = {id: 0, completed: false, title: "", color: "red"}
  isSubmitted: boolean = false;
  errorMessage: string = "";

  // addNewListForm = new FormGroup({
  //   title: new FormControl('', [Validators.required]),
  //   color: new FormControl('', [Validators.required]),
  // });

  constructor(private listService: ListService, private bsModalRef: BsModalRef, private router: Router) {
  }

  onListFormSubmit() {
    this.isSubmitted = true;
    // this.addNewListForm.setValue({
    //   title: this.addNewListForm.get('title')!.value,
    //   color: this.addNewListForm.get('colors')!.value,
    //   completed: false,
    // });
    this.addList$ = this.listService.addList(this.list).subscribe(result => {
        this.event.emit('OK');
        this.bsModalRef.hide();

        // Clear the task list component
        this.router.navigate(['/']);

        // Load the correct component after 10 ms
        setTimeout(()=>{
          this.router.navigate(['/', result.id]);
        }, 10);

      },
      error => {
        this.errorMessage = error.message;
      });
    // this.blogService.addPost(postData).subscribe(data=>{
    //   console.log(data);
    //   if(data!=null && data>0){
    //     this.event.emit('OK');
    //     this.bsModalRef.hide();
    //   }
    // });
  }

  // get title() {
  //   return this.heroForm.get('name');
  // }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.addList$.unsubscribe();
  }


  onClose() {
    this.bsModalRef.hide();
  }

}

import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface Task{
  id: number;
  listId: number;
  completed: boolean;
  title: String;
  deadline: NgbDateStruct;
}

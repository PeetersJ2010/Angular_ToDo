import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {List} from "./list";

export interface Task{
  id: number;
  listId: number;
  completed: boolean;
  title: String;
  deadline: NgbDateStruct;
  list?: List;
}

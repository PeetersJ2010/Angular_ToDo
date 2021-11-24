import {Task} from "./task";

export interface List{
  id: number;
  completed: String;
  title: String;
  color: String;
  tasks?: Task[];
}

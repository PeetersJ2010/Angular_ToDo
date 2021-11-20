import {Task} from "./task";

export interface List{
  id: number;
  completed: boolean;
  title: String;
  color: String;
  tasks?: Task[];
}

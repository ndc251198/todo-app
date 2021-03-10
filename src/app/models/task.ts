import { TaskPiority } from "../commons/enumeration";
import IEntity from "./IEntity";

export default interface Task extends IEntity {

  id: string;

  title: string;

  description: string;

  dueDate: Date;

  piority: TaskPiority;

  done: boolean;
}
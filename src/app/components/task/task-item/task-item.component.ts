import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { StateMode } from 'src/app/commons/enumeration';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input('task')
  public task = {} as Task;

  @Input('checked')
  public checked = false;

  @Output('checkbox')
  public checkbox = new EventEmitter<boolean>()

  public StateMode = StateMode;

  public expanded: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  btnDetailOnClick() {
    this.expanded = !this.expanded;
  }

  btnRemoveOnClick(id: string) {
    this.taskService.remove(id);
  }

  taskFormOnSubmit(task: Task) {
    if (task) {
      task.id = this.task.id;
      this.taskService.update(this.task.id, task);
      this.closeDetail();
    }
  }

  ckbTaskOnChange(event: MatCheckboxChange) {
    if (event) {
      this.checkbox.emit(event.checked);
    }
  }

  closeDetail() {
    this.expanded = false;
  }
}

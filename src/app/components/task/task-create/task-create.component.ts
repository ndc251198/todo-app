import { Component, OnInit } from '@angular/core';
import { getUid } from 'src/app/commons/utils';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  taskFromOnSubmit(task: Task) {
    if (task) {
      task.id = getUid();
      this.taskService.create(task);
    }
  }
}

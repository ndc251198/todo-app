import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { getUid } from 'src/app/commons/utils';
import Task from 'src/app/models/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>,) { }

  ngOnInit(): void {
  }

  taskFromOnSubmit(task: Task) {
    if (task) {
      task.id = getUid();
      this.dialogRef.close(task);
    }
  }


}

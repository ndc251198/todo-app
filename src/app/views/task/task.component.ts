import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from 'src/app/components/task/task-dialog/task-dialog.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  host: {
    'class': 'h-100'
  }
})
export class TaskComponent implements OnInit {

  constructor(public dialog: MatDialog, private taskServices: TaskService) { }

  ngOnInit(): void {
  }

  btnAddOnClick() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '522px'
    });
    dialogRef.afterClosed().subscribe(task => {
      if (task) {
        this.taskServices.create(task);
      }
    });
  }
}

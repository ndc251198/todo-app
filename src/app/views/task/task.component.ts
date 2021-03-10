import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  host: {
    'class': 'h-100'
  }
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

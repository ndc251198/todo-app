import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    'class': 'w-100 h-100 overflow-x-hidden overflow-y-auto'
  }
})
export class AppComponent {
  title = 'todo-app';
}

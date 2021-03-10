import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { StateMode } from 'src/app/commons/enumeration';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public search$: Subject<string> = new Subject<string>();

  public displayTasks: Task[] = [];

  public selected = new SelectionModel<Task>(true, []);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTaks();
    this.subcribeSearch();
  }

  getTaks() {
    const tasks = this.taskService.get();
    this.displayTasks = tasks;
    this.taskService.tasks$.next(tasks);
  }

  subcribeSearch() {
    combineLatest([
      this.search$.pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(100)
      ),
      this.taskService.tasks$,
    ]).subscribe(([search, tasks]) => {
      if (search) {
        this.displayTasks = tasks.filter((t) =>
          t.title.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.displayTasks = tasks;
      }
    });
  }

  txtSearchOnInput(search: string) {
    this.search$.next(search);
  }

  taskItemCheckBoxOnChange(checked: boolean, task: Task) {
    if (task) {
      if (checked) {
        this.selected.select(task);
      } else {
        this.selected.deselect(task);
      }
    }
  }

  bulkRemoveOnClick() {
    let taskSelecteds = this.selected?.selected ?? [];
    if (taskSelecteds?.length > 0) {
      taskSelecteds = taskSelecteds.map((t) => {
        t._state = StateMode.Delete;
        return t;
      });
      this.taskService.saveList(taskSelecteds);
      this.selected.clear();
    }
  }

  bulkDoneOnClick() {
    let taskSelecteds = this.selected?.selected ?? [];
    if (taskSelecteds?.length > 0) {
      taskSelecteds = taskSelecteds.map((t) => {
        t._state = StateMode.Edit;
        t.done = true;
        return t;
      });
      this.taskService.saveList(taskSelecteds);
      this.selected.clear();
    }
  }

  trackByFn(index: number, task: Task) {
    return task.id;
  }
}

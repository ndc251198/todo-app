import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateMode } from '../commons/enumeration';
import storageKey from '../commons/storage-key';
import Task from '../models/task';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(
    private storage: StorageService
  ) {
  }

  get(): Task[] {
    let tasks = this.storage.get<Task[]>(storageKey.Tasks) ?? [];
    if (tasks?.length > 0) {
      tasks = this.sort(tasks);
    }
    return tasks;
  }

  create(task: Task): void {
    let tasks = this.get();
    if (task) {
      tasks.push(task);
      tasks = this.sort(tasks);
      this.setTasksToStorage(tasks);
    }
  }

  update(id: string, task: Task): void {
    const tasks = this.get();
    if (tasks?.length> 0 && id) {
      const index = tasks.findIndex(t => t.id === id);
      if (index > -1) {
        tasks[index] = task;
        this.setTasksToStorage(tasks);
      }
    }
  }

  remove(id: string): void {
    let tasks = this.get();
    if (tasks?.length > 0) {
      tasks = tasks.filter(t => t.id !== id);
      this.setTasksToStorage(tasks);
    }
  }

  saveList(items: Task[]) {
    let tasks = this.get();
    if (tasks?.length && items?.length) {
      const taskAdds = items.filter(t => t._state === StateMode.Add);
      const taskEdits = items.filter(t => t._state === StateMode.Edit && t.id);
      const taskRemoves = items.filter(t => t._state === StateMode.Delete && t.id);

      if (taskAdds?.length) {
        tasks = tasks.concat(...taskAdds);
      }

      if (taskRemoves?.length) {
        tasks = tasks.filter(t => taskRemoves.findIndex(tr => tr.id === t.id) === -1);
      }

      if (taskEdits?.length) {
        taskEdits.forEach(te => {
          const index = tasks.findIndex(t => t.id === te.id);
          if (index > -1) {
            tasks[index] = te;
          } 
        })
      }

      if (tasks?.length) {
        tasks = this.sort(tasks);
      }

      this.setTasksToStorage(tasks);
    }
  }

  private setTasksToStorage(items: Task[]) {
    this.storage.set(storageKey.Tasks, items);
    this.tasks$.next(items);
  }

  private sort(tasks: Task[]): Task[] {
    const sorted = tasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    return sorted;
  }
}

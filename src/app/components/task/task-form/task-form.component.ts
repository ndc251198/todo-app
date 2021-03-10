import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { StateMode, TaskPiority } from 'src/app/commons/enumeration';
import Task from 'src/app/models/task';

interface PiorityOption {
  name: string;

  value: TaskPiority;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {

  @ViewChild(FormGroupDirective, { static: true })
  _form!: FormGroupDirective;

  @Output('submitTask')
  submitTask: EventEmitter<Task> = new EventEmitter<Task>();

  @Input('task')
  public task = {} as Task;

  @Input('mode')
  public mode = StateMode.Add;

  public StateMode = StateMode;
  
  public piorities: PiorityOption[] = [
    {
      name: 'Normal',
      value: TaskPiority.Normal
    },
    {
      name: 'Low',
      value: TaskPiority.Low
    },
    {
      name: 'Hight',
      value: TaskPiority.Hight
    }
  ];

  public taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [new Date()],
    piority: [TaskPiority.Normal]
  });

  get titleControl(){
    return this.taskForm.get('title');
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    const changeTask: SimpleChange = changes.task;
    if (changeTask) {
      this.setTaskToForm(changeTask.currentValue as Task);
    }
  }

  taskFromOnSubmit() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      if (task) {
        this.submitTask.emit(task);
        if (this.mode == StateMode.Add) {
          this.resetForm();
        }
      }
    }
  }

  resetForm() {
    this.taskForm.reset();
    this._form.resetForm();
    this.taskForm.patchValue({
      dueDate: new Date(),
      piority: TaskPiority.Normal
    } as Task)
  }

  setTaskToForm(task: Task) {
    if (task) {
      this.taskForm.patchValue(task);
    }
  }
}

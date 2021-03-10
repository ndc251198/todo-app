import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { StateMode, TaskPiority } from 'src/app/commons/enumeration';
import Task from 'src/app/models/task';

interface PiorityOption {
  name: string;

  value: TaskPiority;
}

function notPastToday(): ValidatorFn {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return (control: AbstractControl): {[key: string]: any} | null => {
    const past =  new Date(control.value).getTime() < today.getTime();
    return past ? {past: {value: control.value}} : null;
  };
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
    dueDate: [new Date(), notPastToday()],
    piority: [TaskPiority.Normal]
  });

  get titleControl(){
    return this.taskForm.get('title');
  }

  get dueDateControl() {
    return this.taskForm.get('dueDate');
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

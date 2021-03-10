import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskCreateComponent } from 'src/app/components/task/task-create/task-create.component';
import { TaskItemComponent } from 'src/app/components/task/task-item/task-item.component';
import { TaskListComponent } from 'src/app/components/task/task-list/task-list.component';
import { TaskFormComponent } from 'src/app/components/task/task-form/task-form.component';
import { TaskDialogComponent } from 'src/app/components/task/task-dialog/task-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskCreateComponent,
    TaskItemComponent,
    TaskFormComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule
  ],
})
export class TaskModule {}

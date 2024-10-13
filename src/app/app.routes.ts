
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: '', component: TaskListComponent }, 
  { path: 'add-task', component: TaskFormComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
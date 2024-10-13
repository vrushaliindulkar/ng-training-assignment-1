import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule, TaskFormComponent, ConfirmationDialogComponent],
})
export class TaskListComponent {
  tasks: any[] = [];
  paginatedTasks: any[] = [];
  currentPage: number = 1;
  tasksPerPage: number = 5;
  totalTasks: number = 0;
  searchQuery: string = '';
  isFormVisible: boolean = false;
  taskToEdit: any = null; 
  isDeleteDialogVisible = false;
  taskToDelete: any;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  handleAddTask(newTask: any) {
    if (this.taskToEdit) {
      const index = this.tasks.findIndex(task => task === this.taskToEdit);
      if (index !== -1) {
        this.tasks[index] = { ...this.taskToEdit, ...newTask };
      }
    } else {
      this.tasks.push(newTask);
    }
    this.isFormVisible = false;
    this.taskToEdit = null;

    this.updateTaskCount();
    this.updatePaginatedTasks();
  }

  editTask(task: any) {
    this.taskToEdit = task; 
    this.isFormVisible = true; 
  }

  deleteTaskPrompt(task: any) {
    this.taskToDelete = task;
    this.isDeleteDialogVisible = true;
  }

  deleteTask(task: any) {
    this.tasks = this.tasks.filter(t => t !== task); 
    this.isDeleteDialogVisible = false; 
    this.updateTaskCount();
    this.updatePaginatedTasks();
  }

  refreshTasks() {
    console.log('Tasks refreshed');
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this.tasks.forEach(task => {
      task.selected = isChecked;
    });
  }

  updateTaskCount() {
    this.totalTasks = this.tasks.length;
  }

  updatePaginatedTasks() {
    const start = (this.currentPage - 1) * this.tasksPerPage;
    const end = start + this.tasksPerPage;
    this.paginatedTasks = this.tasks.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTasks();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTasks();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalTasks / this.tasksPerPage);
  }

  ngOnInit() {
    this.updateTaskCount();
    this.updatePaginatedTasks();
  }
}

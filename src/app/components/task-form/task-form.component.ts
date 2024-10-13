import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() taskToEdit: any; 
  @Output() close = new EventEmitter<void>();
  @Output() addTask = new EventEmitter<any>(); 

  assignedTo: string = '';
  status: string = '';
  dueDate: string = '';
  priority: string = '';
  description: string = '';

  ngOnChanges() {
    if (this.taskToEdit) {
      this.assignedTo = this.taskToEdit.assignedTo;
      this.status = this.taskToEdit.status;
      this.dueDate = this.taskToEdit.dueDate;
      this.priority = this.taskToEdit.priority;
      this.description = this.taskToEdit.description;
    }
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      const newTask = {
        assignedTo: this.assignedTo,
        status: this.status,
        dueDate: this.dueDate,
        priority: this.priority,
        description: this.description,
      };
      this.addTask.emit(newTask); 
      this.close.emit(); 
      this.resetForm();
    }
  }

  resetForm() {
    this.assignedTo = '';
    this.status = '';
    this.dueDate = '';
    this.priority = '';
    this.description = '';
  }
}

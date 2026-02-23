import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Task, TaskStatus, TaskPriority } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  styles: [`.form-card{max-width:600px;margin:0 auto}.form-actions{display:flex;gap:.75rem;justify-content:flex-end;margin-top:1.5rem}.page-header{margin-bottom:1.5rem}.page-title{font-size:1.5rem;font-weight:700}`]
})
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', status: 'TODO', priority: 'MEDIUM' };
  categories: Category[] = [];
  isEdit  = false;
  loading = false;
  saving  = false;
  error   = '';
  selectedCategoryId: number | '' = '';

  readonly statuses: { value: TaskStatus; label: string }[] = [
    { value: 'TODO',        label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'DONE',        label: 'Done' },
    { value: 'CANCELLED',   label: 'Cancelled' }
  ];
  readonly priorities: { value: TaskPriority; label: string }[] = [
    { value: 'LOW',      label: 'Low' },
    { value: 'MEDIUM',   label: 'Medium' },
    { value: 'HIGH',     label: 'High' },
    { value: 'CRITICAL', label: 'Critical' }
  ];

  constructor(
    private taskSvc: TaskService,
    private catSvc: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.catSvc.getAll().subscribe({
      next: (cats: Category[]) => (this.categories = cats)
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit  = true;
      this.loading = true;
      this.taskSvc.getById(+id).subscribe({
        next: (t: Task) => {
          this.task               = t;
          this.selectedCategoryId = t.category?.id ?? '';
          this.loading            = false;
        },
        error: () => { this.error = 'Task not found.'; this.loading = false; }
      });
    }
  }

  save(): void {
    if (!this.task.title.trim()) { this.error = 'Title is required.'; return; }
    this.saving = true;
    this.error  = '';
    const payload: Task = {
      ...this.task,
      category: this.selectedCategoryId
        ? { id: this.selectedCategoryId as number, name: '' }
        : undefined
    };
    const req$ = this.isEdit
      ? this.taskSvc.update(this.task.id!, payload)
      : this.taskSvc.create(payload);
    req$.subscribe({
      next:  () => this.router.navigate(['/tasks']),
      error: () => { this.error = 'Failed to save task.'; this.saving = false; }
    });
  }

  cancel(): void { this.router.navigate(['/tasks']); }
}

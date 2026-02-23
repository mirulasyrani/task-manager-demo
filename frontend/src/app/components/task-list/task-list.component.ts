import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Task, TaskStatus, TaskPriority } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-list.component.html',
  styles: [`
    .filters{display:flex;flex-wrap:wrap;gap:.75rem;margin-bottom:1.5rem}
    .filters input,.filters select{flex:1;min-width:160px}
    .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem}
    .task-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.1rem;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:.6rem;transition:box-shadow .2s}
    .task-card:hover{box-shadow:var(--shadow-md)}
    .task-title{font-weight:600;font-size:.95rem}
    .task-desc{color:var(--muted);font-size:.85rem;line-height:1.5}
    .task-meta{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center}
    .task-footer{display:flex;justify-content:flex-end;gap:.5rem;margin-top:.4rem}
    .category-tag{font-size:.75rem;color:var(--primary);background:#ede9fe;padding:.15rem .5rem;border-radius:999px}
    .empty-state{text-align:center;padding:4rem 1rem;color:var(--muted)}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
    .page-title{font-size:1.5rem;font-weight:700}
    .stats-row{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem}
    .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:.75rem 1.25rem;flex:1;min-width:100px}
    .stat-label{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
    .stat-value{font-size:1.5rem;font-weight:700}
  `]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  loading = false;
  error = '';
  searchQuery = '';
  filterStatus = '';
  filterPriority = '';
  filterCategory: number | '' = '';

  readonly statuses: TaskStatus[]     = ['TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED'];
  readonly priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  constructor(private taskSvc: TaskService, private catSvc: CategoryService) {}

  ngOnInit(): void {
    this.catSvc.getAll().subscribe({
      next: (cats: Category[]) => (this.categories = cats)
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error   = '';
    this.taskSvc.getAll({
      status:     this.filterStatus    || undefined,
      priority:   this.filterPriority  || undefined,
      categoryId: this.filterCategory  ? (this.filterCategory as number) : undefined,
      search:     this.searchQuery     || undefined
    }).subscribe({
      next:  (tasks: Task[]) => { this.tasks = tasks; this.loading = false; },
      error: ()              => { this.error = 'Failed to load tasks.'; this.loading = false; }
    });
  }

  deleteTask(id: number): void {
    if (!confirm('Delete this task?')) return;
    this.taskSvc.delete(id).subscribe({ next: () => this.loadTasks() });
  }

  resetFilters(): void {
    this.searchQuery    = '';
    this.filterStatus   = '';
    this.filterPriority = '';
    this.filterCategory = '';
    this.loadTasks();
  }

  get todoCount():       number { return this.tasks.filter(t => t.status === 'TODO').length; }
  get inProgressCount(): number { return this.tasks.filter(t => t.status === 'IN_PROGRESS').length; }
  get doneCount():       number { return this.tasks.filter(t => t.status === 'DONE').length; }

  statusBadge(s: TaskStatus): string {
    const m: Record<TaskStatus, string> = { TODO: 'badge-todo', IN_PROGRESS: 'badge-in-progress', DONE: 'badge-done', CANCELLED: 'badge-cancelled' };
    return m[s] ?? '';
  }
  priorityBadge(p: TaskPriority): string {
    const m: Record<TaskPriority, string> = { LOW: 'badge-low', MEDIUM: 'badge-medium', HIGH: 'badge-high', CRITICAL: 'badge-critical' };
    return m[p] ?? '';
  }
  formatStatus(s: string): string { return s.replace('_', ' '); }
}

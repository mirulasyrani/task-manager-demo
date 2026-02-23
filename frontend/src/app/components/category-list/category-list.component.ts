import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <h1 class="page-title">Categories</h1>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;max-width:900px">

      <!-- Add / Edit Form -->
      <div class="card">
        <div class="card-header">{{ editing ? 'Edit Category' : 'New Category' }}</div>

        <div *ngIf="formError" class="invalid-feedback" style="margin-bottom:.75rem">{{ formError }}</div>

        <div class="form-group">
          <label>Name</label>
          <input class="form-control" [(ngModel)]="form.name" placeholder="e.g. Backend">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" rows="3" [(ngModel)]="form.description"
                    placeholder="Optional description…"></textarea>
        </div>
        <div style="display:flex;gap:.5rem;justify-content:flex-end">
          <button *ngIf="editing" class="btn btn-secondary" (click)="cancelEdit()">Cancel</button>
          <button class="btn btn-primary" (click)="save()" [disabled]="saving">
            {{ saving ? 'Saving…' : (editing ? 'Update' : 'Add Category') }}
          </button>
        </div>
      </div>

      <!-- List -->
      <div>
        <div *ngIf="loading" class="text-muted" style="padding:1rem">Loading…</div>
        <div *ngIf="error"   class="invalid-feedback">{{ error }}</div>

        <div *ngFor="let cat of categories" class="card" style="margin-bottom:.75rem">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-weight:600">{{ cat.name }}</div>
              <div class="text-muted text-sm mt-1">{{ cat.description || '—' }}</div>
            </div>
            <div style="display:flex;gap:.4rem">
              <button class="btn btn-sm btn-secondary" (click)="startEdit(cat)">Edit</button>
              <button class="btn btn-sm btn-danger"    (click)="delete(cat.id!)">Delete</button>
            </div>
          </div>
        </div>

        <div *ngIf="!loading && categories.length === 0" class="text-muted text-sm" style="padding:.5rem">
          No categories yet.
        </div>
      </div>

    </div>
  `,
  styles: [`.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}.page-title{font-size:1.5rem;font-weight:700}`]
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  loading   = false;
  error     = '';
  formError = '';
  saving    = false;
  editing   = false;

  form: Category = { name: '', description: '' };
  private editingId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next:  (cats: Category[]) => { this.categories = cats; this.loading = false; },
      error: ()                 => { this.error = 'Failed to load categories.'; this.loading = false; }
    });
  }

  save(): void {
    if (!this.form.name.trim()) { this.formError = 'Name is required.'; return; }
    this.saving    = true;
    this.formError = '';

    const req$ = this.editing && this.editingId != null
      ? this.categoryService.update(this.editingId, this.form)
      : this.categoryService.create(this.form);

    req$.subscribe({
      next: () => { this.resetForm(); this.load(); this.saving = false; },
      error: (err: { error?: { message?: string } }) => {
        this.formError = err.error?.message ?? 'Failed to save.';
        this.saving    = false;
      }
    });
  }

  startEdit(cat: Category): void {
    this.editing   = true;
    this.editingId = cat.id!;
    this.form      = { name: cat.name, description: cat.description };
  }

  cancelEdit(): void { this.resetForm(); }

  delete(id: number): void {
    if (!confirm('Delete this category?')) return;
    this.categoryService.delete(id).subscribe({ next: () => this.load() });
  }

  private resetForm(): void {
    this.form      = { name: '', description: '' };
    this.editing   = false;
    this.editingId = null;
    this.formError = '';
  }
}

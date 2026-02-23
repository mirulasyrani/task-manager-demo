import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-inner">
        <div class="brand"><span class="brand-icon">✓</span><span class="brand-name">TaskManager</span></div>
        <nav class="nav">
          <a routerLink="/tasks"      routerLinkActive="active">Tasks</a>
          <a routerLink="/categories" routerLinkActive="active">Categories</a>
          <a routerLink="/tasks/new" class="btn btn-primary btn-sm">+ New Task</a>
        </nav>
      </div>
    </header>`,
  styles: [`.header{background:#fff;border-bottom:1px solid var(--border);box-shadow:var(--shadow);position:sticky;top:0;z-index:100}.header-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:.85rem 1.25rem}.brand{display:flex;align-items:center;gap:.5rem}.brand-icon{width:32px;height:32px;background:var(--primary);color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700}.brand-name{font-size:1.1rem;font-weight:700}.nav{display:flex;align-items:center;gap:1.5rem}.nav a{color:var(--muted);font-size:.9rem;font-weight:500}.nav a.active,.nav a:hover{color:var(--primary);text-decoration:none}`]
})
export class HeaderComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `<app-header></app-header><main class="main-content"><router-outlet></router-outlet></main>`,
  styles: [`.main-content{max-width:1100px;margin:0 auto;padding:2rem 1.25rem}`]
})
export class AppComponent { title = 'Task Manager'; }

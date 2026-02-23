import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly API = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient) {}
  getAll(f: {status?:string;priority?:string;categoryId?:number;search?:string}={}): Observable<Task[]> {
    let p = new HttpParams();
    if (f.status)     p = p.set('status', f.status);
    if (f.priority)   p = p.set('priority', f.priority);
    if (f.categoryId) p = p.set('categoryId', f.categoryId.toString());
    if (f.search)     p = p.set('search', f.search);
    return this.http.get<Task[]>(this.API, { params: p });
  }
  getById(id: number): Observable<Task>         { return this.http.get<Task>(`${this.API}/${id}`); }
  create(t: Task): Observable<Task>             { return this.http.post<Task>(this.API, t); }
  update(id: number, t: Task): Observable<Task>  { return this.http.put<Task>(`${this.API}/${id}`, t); }
  delete(id: number): Observable<void>           { return this.http.delete<void>(`${this.API}/${id}`); }
}

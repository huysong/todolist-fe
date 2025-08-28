import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoUrl = 'http://localhost:5001/api/Todo';
  constructor(private http: HttpClient) {}

  // xem các công việc
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl);
  }

  // thêm công việc
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo)
  }

  // sửa công việc
  updateTodo(id: number, todo: Todo): Observable<any> {
    return this.http.put(`${this.todoUrl}/${id}`, todo)
  }

  // xóa công việc
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.todoUrl}/${id}`)
  }
}

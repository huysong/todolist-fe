import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // <-- cần import map để lấy res.data
import { Todo } from '../models/todo';

// định nghĩa interface cho ApiResponse
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoUrl = 'http://localhost:5001/api/Todo';
  constructor(private http: HttpClient) {}

  // xem các công việc
  getTodos(): Observable<Todo[]> {
    return this.http.get<ApiResponse<Todo[]>>(this.todoUrl).pipe(map((res) => res.data)); // <-- lấy đúng mảng todo từ response
  }

  // thêm công việc
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<ApiResponse<Todo>>(this.todoUrl, todo).pipe(map((res) => res.data)); // <-- unwrap data
  }

  // sửa công việc
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http
      .put<ApiResponse<Todo>>(`${this.todoUrl}/${id}`, todo)
      .pipe(map((res) => res.data)); // <-- unwrap data
  }

  // xóa công việc
  deleteTodo(id: number): Observable<number> {
    return this.http
      .delete<ApiResponse<number>>(`${this.todoUrl}/${id}`)
      .pipe(map((res) => res.data)); // <-- unwrap id đã xóa
  }
}

import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { Todo } from '../../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
  standalone: true,
})
export class Todos implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  loading: boolean = false;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.zone.run(() => {
          this.todos = todos;
          this.loading = false;
          this.cdr.detectChanges(); 
        });
      },
      error: (error) => {
        this.zone.run(() => {
          console.error('Error loading todos: ', error);
          this.showMessage('Lỗi khi tải danh sách công việc');
          this.loading = false;
          this.cdr.detectChanges(); 
        });
      },
    });
  }

  addTodo(): void {
    const title = this.newTodoTitle.trim();
    if (!title) return;

    const newTodo: Todo = { title, isDone: false };

    this.todoService.createTodo(newTodo).subscribe({
      next: (todo) => {
        this.zone.run(() => {
          this.todos = [todo, ...this.todos];
          this.newTodoTitle = '';
          this.showMessage('Thêm công việc mới thành công');
          this.cdr.detectChanges(); 
        });
      },
      error: (error) => {
        this.zone.run(() => {
          console.error('Error creating todo: ', error);
          this.showMessage('Lỗi khi thêm công việc');
          this.cdr.detectChanges(); 
        });
      },
    });
  }

  editTodo(todo: Todo): void {
    if (!todo.id) return;
    const updatedTodo = { ...todo, isDone: !todo.isDone };

    this.todoService.updateTodo(todo.id, updatedTodo).subscribe({
      next: () => {
        this.zone.run(() => {
          todo.isDone = !todo.isDone;
          this.showMessage('Cập nhật trạng thái thành công');
          this.cdr.detectChanges(); 
        });
      },
      error: (error) => {
        this.zone.run(() => {
          console.error('Error updating todo: ', error);
          this.cdr.detectChanges(); 
        });
      },
    });
  }

  deleteTodo(todo: Todo): void {
    if (!todo.id) return;

    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.zone.run(() => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
          this.showMessage('Xóa công việc thành công');
          this.cdr.detectChanges(); 
        });
      },
      error: (error) => {
        this.zone.run(() => {
          console.error('Error deleting todo: ', error);
          this.showMessage('Lỗi khi xóa công việc');
          this.cdr.detectChanges(); 
        });
      },
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  get completedTodosCount(): number {
    return this.todos.filter((t) => t.isDone).length;
  }

  get remainingTodosCount(): number {
    return this.todos.filter((t) => !t.isDone).length;
  }
}

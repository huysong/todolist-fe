import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todos } from './components/todos/todos';
import { FormsModule } from '@angular/forms'





@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Todos,
    FormsModule,
    // Material Modules

  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('angular1-component');
}

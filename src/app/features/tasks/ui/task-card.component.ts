import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '../models/task';

@Component({
  standalone: true,
  selector: 'app-task-card',
  template: `
  <article class="card">
    <header>
      <strong>{{ task.title }}</strong>
    </header>
  @if(task.description) {
    <p>{{ task.description }}</p>
  }

  <footer class="actions">
      <button (click)="moveLeft.emit()">◀︎</button>
      <span class="status">{{ task.status }}</span>
      <button (click)="moveRight.emit()">▶︎</button>
    </footer>
  </article>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 10px;
      padding: .75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }
     .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .status {
      font-size: .85rem;
      opacity: .7;
      text-transform: capitalize;
    }
    button {
      padding: .25rem .5rem;
    }
    `]
})

export class TaskCard {
  @Input() task!: Task;
  @Output() moveLeft = new EventEmitter<void>();
  @Output() moveRight = new EventEmitter<void>();
}
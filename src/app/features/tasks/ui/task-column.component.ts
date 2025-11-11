import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';
import { TaskCard } from './task-card.component';

@Component({
  standalone: true,
  selector: 'app-task-column',
  imports: [TaskCard],
  template: `
    <section class="col">
      <h2>{{ title }}</h2>
      <div class="stack">
        @for (t of tasks; track t.id) {
        <app-task-card [task]="t" (moveLeft)="emitMove(t, -1)" (moveRight)="emitMove(t, +1)">
        </app-task-card>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .col {
        background: #f7f7f7;
        border-radius: 12px;
        padding: 0.75rem;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
      }
      .stack {
        display: grid;
        gap: 0.5rem;
      }
      h2 {
        margin: 0.25rem 0 0.75rem;
        font-size: 1.1rem;
        font-weight: 600;
      }
    `,
  ],
})
export class TaskColumn {
  @Input() title!: string;
  @Input() tasks: Task[] = [];
  @Output() move = new EventEmitter<{ id: string; to: 'todo' | 'doing' | 'done' }>();

  private readonly order: ('todo' | 'doing' | 'done')[] = ['todo', 'doing', 'done'];

  emitMove(task: Task, dir: -1 | 1) {
    const idx = this.order.indexOf(task.status);
    const next = this.order[idx + dir];
    if (next) this.move.emit({ id: task.id, to: next });
  }
}

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
        <app-task-card
          [task]="t"
          (open)="clickTask.emit(t)"
          (moveLeft)="emitMove(t, -1)"
          (moveRight)="emitMove(t, +1)"
        >
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
        border: 1px solid #e3e3e3;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        transition: background 0.2s ease;
      }

      .col:hover {
        background: #f0f0f0;
      }

      h2 {
        margin: 0.25rem 0 0.75rem;
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: #333;
      }
      .stack {
        display: grid;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;
        padding-right: 4px;
        flex: 1;
      }

      .stack::-webkit-scrollbar {
        width: 6px;
      }

      .stack::-webkit-scrollbar-thumb {
        background: #c4c4c4;
        border-radius: 6px;
      }
    `,
  ],
})
export class TaskColumn {
  @Input() title!: string;
  @Input() tasks: Task[] = [];
  @Output() move = new EventEmitter<{ id: string; to: 'todo' | 'doing' | 'done' }>();
  @Output() clickTask = new EventEmitter<Task>();

  private readonly order: ('todo' | 'doing' | 'done')[] = ['todo', 'doing', 'done'];

  emitMove(task: Task, dir: -1 | 1) {
    const idx = this.order.indexOf(task.status);
    const next = this.order[idx + dir];
    if (next) this.move.emit({ id: task.id, to: next });
  }
}

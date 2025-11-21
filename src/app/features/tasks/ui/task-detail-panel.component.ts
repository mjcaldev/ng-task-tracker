import { Component, EventEmitter, Input, Output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task';

@Component({
  standalone: true,
  selector: 'app-task-detail-panel',
  imports: [FormsModule],
  template: `
  @if (task) {
      <aside class="panel">
        <header>
          <h3>Edit Task</h3>
          <button class="close" (click)="close.emit()">×</button>
        </header>

        <form (submit)="submit($event)">
          <label>
            Title
            <input [(ngModel)]="draft().title" name="title" required />
          </label>

          <label>
            Description
            <textarea [(ngModel)]="draft().description" name="description"></textarea>
          </label>

          <footer class="actions">
            <button type="submit">Save</button>
            <button type="button" class="delete" (click)="delete.emit(task.id)">Delete</button>
          </footer>
        </form>
      </aside>
    }
  `,
  styles: [`
    .panel {
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      width: 360px;
      background: white;
      box-shadow: -2px 0 8px rgba(0,0,0,.1);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      z-index: 10;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close {
      border: none;
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: .75rem;
      flex: 1;
    }
    label {
      display: flex;
      flex-direction: column;
      font-weight: 500;
    }
    input, textarea {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: .5rem;
      width: 100%;
    }
    .actions {
      display: flex;
      justify-content: space-between;
    }
    button {
      padding: .5rem .75rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button.delete {
      background: #e74c3c;
      color: white;
    }
    button[type="submit"] {
      background: #007bff;
      color: white;
    }
  `]
  })
export class TaskDetailPanel {
  /** Inputs & Outputs */
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ id: string; title: string; description: string }>();
  @Output() delete = new EventEmitter<string>();

  /** Local state for editing */
  draft = signal<{ title: string; description: string }>({ title: '', description: '' });

  constructor() {
    // Keep draft in sync when input changes
    effect(() => {
      if (this.task) {
        this.draft.set({
          title: this.task.title,
          description: this.task.description ?? '',
        });
      }
    });
  }

  /** Submit handler */
  submit(event: Event) {
    event.preventDefault();
    if (!this.task) return;
    const { title, description } = this.draft();
    this.save.emit({ id: this.task.id, title, description });
  }
}
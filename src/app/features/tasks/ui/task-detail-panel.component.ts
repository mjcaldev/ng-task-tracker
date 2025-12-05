import { Component, EventEmitter, Input, Output, signal, OnChanges, SimpleChanges } from '@angular/core';
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
          <button class="close" (click)="closed.emit()">×</button>
        </header>

        <form (submit)="submit($event)">
          <label>
            Title
            <input 
              [ngModel]="draft().title"
              (ngModelChange)="onTitleChange($event)" 
              name="title" 
              required
            />
          </label>

          <label>
            Description
            <textarea 
            [ngModel]="draft().description"
            (ngModelChange)="onDescriptionChange($event)"
            name="description"
            >
            </textarea>
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
  /* Backdrop behind the panel */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(2px);
  animation: fadeIn 0.25s ease forwards;
  z-index: 9;
}

/* Slide-in animation for the panel */
.panel {
  animation: slideIn 0.25s ease forwards;
}

/* Cleaner panel visual design */
.panel {
  border-radius: 0 0 0 12px;
  padding: 1.25rem;
  background: #ffffff;
  box-shadow: -4px 0 18px rgba(0,0,0,0.12);
}

header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.close {
  font-size: 1.6rem;
  line-height: 1;
  padding: 0.25rem;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.close:hover {
  background: #f3f4f6;
}

/* Inputs */
input, textarea {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  font-size: 0.9rem;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

/* Action buttons */
.primary {
  background: #2563eb;
  color: white;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.15s ease, transform 0.15s ease;
}

.primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.delete {
  background: #dc2626;
  color: white;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.15s ease, transform 0.15s ease;
}

.delete:hover {
  background: #b91c1c;
  transform: translateY(-1px);
}

/* Animations */
@keyframes slideIn {
  from { transform: translateX(40px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
  `]
  })
export class TaskDetailPanel implements OnChanges {

  @Input() task: Task | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ id: string; title: string; description: string }>();
  @Output() delete = new EventEmitter<string>();

  /** Local state for editing */
  draft = signal<{ title: string; description: string }>({ title: '', description: '' });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.draft.set({
        title: this.task.title,
        description: this.task.description ?? '',
      });
    }
  }

  /** Submit handler */
  submit(event: Event) {
    event.preventDefault();
    if (!this.task) return;
    const { title, description } = this.draft();
    this.save.emit({ id: this.task.id, title, description });
  }

  onTitleChange(value: string) {
    this.draft.update(d => ({ ...d, title: value}));
  }

  onDescriptionChange(value: string) {
    this.draft.update(d => ({ ...d, description: value}));
  }
}
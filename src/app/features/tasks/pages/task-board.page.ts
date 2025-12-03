import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskBoardStore } from '../state/task-board.store';
import { TaskColumn } from '../ui/task-column.component';
import { TaskDetailPanel } from '../ui/task-detail-panel.component';
import { Task } from '../models/task';

@Component({
  standalone: true,
  selector: 'app-task-board-page',
  imports: [FormsModule, TaskColumn, TaskDetailPanel],
  template: `
    <section class="board">
      <header class="bar">
        <h1>Task Board</h1>
      </header>
      <form (submit)="create($event)">
        <input [(ngModel)]="newTitle" name="title" placeholder="New Task Title...name=" required />
      </form>
      <main class="cols">
        <app-task-column
          title="To Do"
          [tasks]="store.todo()"
          (move)="onMove($event)"
          (clickTask)="openDetail($event)"
        >
        </app-task-column>

        <app-task-column 
        title="Doing" 
        [tasks]="store.doing()" 
        (move)="onMove($event)"
        (clickTask)="openDetail($event)"
        >
        </app-task-column>

        <app-task-column 
        title="Done" 
        [tasks]="store.done()" 
        (move)="onMove($event)"
        (clickTask)="openDetail($event)"
        >
        </app-task-column>
      </main>
      <app-task-detail-panel
        [task]="selectedTask()"
        (closed)="closeDetail()"
        (save)="onSave($event)"
        (delete)="onDelete($event)"
      >
      </app-task-detail-panel>
    </section>
  `,
  styles: [
    `
      .board {
        padding: 1rem;
      }
      .bar {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
      }
      .cols {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;
      }
      form input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        padding: 0.5rem 0.75rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class TaskBoardPage {
  store = inject(TaskBoardStore);
  newTitle = '';

  // shows which task is selected for editing
  selectedId = signal<string | null>(null);

  // produces the selected task or null
  selectedTask = () => {
    const id = this.selectedId();
    const all = [...this.store.todo(), ...this.store.doing(), ...this.store.done()];
    return all.find((t) => t.id === id) ?? null;
  };

  /** create new task */
  create(event: Event) {
    event.preventDefault();
    const title = this.newTitle.trim();
    if (!title) return;
    this.store.add(title); // <-- you were missing this!
    this.newTitle = '';
  }

  /** handle move events from TaskColumn */
  onMove(evt: { id: string; to: 'todo' | 'doing' | 'done' }) {
    this.store.move(evt.id, evt.to);
  }

  /** open editor */
  openDetail(task: Task) {
    this.selectedId.set(task.id);
  }

  /** close editor */
  closeDetail() {
    this.selectedId.set(null);
  }

  /** save edits from panel */
  onSave({ id, title, description }: { id: string; title: string; description: string }) {
    this.store.update(id, { title, description });
    this.closeDetail();
  }

  /** delete task */
  onDelete(id: string) {
    this.store.remove(id);
    this.closeDetail();
  }
}

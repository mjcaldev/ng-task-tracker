import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskBoardStore } from '../state/task-board.store';
import { TaskColumn } from '../ui/task-column.component';

@Component({
  standalone: true,
  selector: 'app-task-board-page',
  imports: [FormsModule, TaskColumn],
  template: `
  <section class="board">
    <header class="bar">
    <h1>Task Board</h1>
    </header>
    <form (submit)="create($event)">
      <input 
      [(ngModel)]="newTitle"
      name="title"
      placeholder="New Task Title...name="
      required
      />
    </form>
    <main class="cols">
        <app-task-column
          title="To Do"
          [tasks]="store.todo()"
          (move)="onMove($event)">
        </app-task-column>

        <app-task-column
          title="Doing"
          [tasks]="store.doing()"
          (move)="onMove($event)">
        </app-task-column>

        <app-task-column
          title="Done"
          [tasks]="store.done()"
          (move)="onMove($event)">
        </app-task-column>
      </main>
  </section>
  `,
  styles: [`
    .board { padding: 1rem; }
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
      padding: .5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: .5rem .75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})

export class TaskBoardPage {
  store = inject(TaskBoardStore);
  newTitle = '';
  selected = signal<string | null>(null);

  create(event: Event) {
    event.preventDefault();
    const title = this.newTitle.trim();
    if(!title) return;
    this.newTitle = '';
  }
  onMove(evt: { id: string; to: 'todo' | 'doing' | 'done'}) {
    this.store.move(evt.id, evt.to);
  }
}
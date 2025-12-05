import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  standalone: true,
  selector: 'app-task-card',
  template: `
    <article class="card" (click)="open.emit()">
      <header class="card-header">
        <strong>{{ task.title }}</strong>
      </header>
      @if(task.description) {
      <p class="card-desc">{{ task.description }}</p>
      }

      <footer class="actions">
        <button class="arrow-btn" (click)="moveLeft.emit(); $event.stopPropagation()">◀︎</button>
        <span class="status">{{ task.status }}</span>
        <button class="arrow-btn" (click)="moveRight.emit(); $event.stopPropagation()">▶︎</button>
      </footer>
    </article>
  `,
  styles: [
    `
      .card {
        background: white;
        border-radius: 10px;
        padding: 0.75rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.7;
        text-transform: capitalize;
      }
      button {
        padding: 0.25rem 0.5rem;
      }

      /* Card hover + elevation */
      .card {
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      }

      /* Header styling */
      .card-header {
        display: flex;
        align-items: center;
      }

      .card-header strong {
        font-size: 1rem;
        font-weight: 600;
        color: #333;
      }

      /* Description styling */
      .card-desc {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.35;
      }

      /* Status pill style */
      .status {
        background: #f3f4f6;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 500;
      }

      /* Arrow button polish */
      .arrow-btn {
        background: #f3f4f6;
        border: none;
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background 0.15s ease, transform 0.15s ease;
      }

      .arrow-btn:hover {
        background: #e5e7eb;
        transform: scale(1.1);
      }

      .arrow-btn:active {
        transform: scale(0.95);
      }
    `,
  ],
})
export class TaskCard {
  @Input() task!: Task;
  @Output() moveLeft = new EventEmitter<void>();
  @Output() moveRight = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();
}

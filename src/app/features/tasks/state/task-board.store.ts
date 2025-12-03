import { Injectable, signal, computed } from '@angular/core';
import { Task, TaskStatus } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskBoardStore {
  private readonly tasks = signal<Task[]>([]);

  //Derived Lists
  todo = computed(() => this.tasks().filter(t => t.status === 'todo'));
  doing = computed(() => this.tasks().filter(t => t.status === 'doing'));
  done = computed(() => this.tasks().filter(t => t.status === 'done'));

  add(title: string, description = '') {
    const now = Date.now();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo',
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.update(list => [...list, newTask]);
  }

  move(id: string, status: TaskStatus) {
    this.tasks.update( list =>
      list.map(t => (t.id === id ? { ...t, status, updatedAt: Date.now() } : t))
    )
  }

  update(id: string, changes: { title?: string; description?: string }) {
  this.tasks.update(list =>
    list.map(t =>
      t.id === id
        ? { ...t, ...changes, updatedAt: Date.now() }
        : t
    )
  );
}

remove(id: string) {
  this.tasks.update(list => list.filter(t => t.id !== id));
}
}
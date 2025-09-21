import { Injectable } from '@nestjs/common';
import { last } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  create(title: string): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, done: boolean): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error('Task not found');
    task.done = done;
    return task;
  }

  remove(id: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Task not found');
    this.tasks.splice(index, 1);
  }
}

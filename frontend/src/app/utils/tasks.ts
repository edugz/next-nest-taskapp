export interface Task {
    id: number;
    title: string;
    done: boolean;
}

export function filterCompleted(tasks: Task[]) {
    return tasks.filter(task => task.done);
}

export function countIncomplete(tasks: Task[]): number {
    return tasks.filter(task => !task.done).length;
}
// /types/task.ts

export interface Task {
	id: string;
	title: string;
	done: boolean;
	createdAt: number;
}

export interface Subject {
	id: string;
	name: string;
	tasks: Task[];
}

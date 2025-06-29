"use client";

import { useState } from "react";
import {
	ChevronDown,
	Plus,
	Trash2,
	GripVertical,
	Check,
	Tag,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface Task {
	id: string;
	text: string;
	completed: boolean;
	tag: string;
}

interface Subject {
	id: string;
	name: string;
	tasks: Task[];
}

export function TaskManager() {
	const [subjects, setSubjects] = useState<Subject[]>([
		{
			id: "All",
			name: "Tasks",
			tasks: [],
		},
	]);
	const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0].id);
	const [newTaskText, setNewTaskText] = useState("");
	const [newSubjectName, setNewSubjectName] = useState("");
	const [showAddSubjectDialog, setShowAddSubjectDialog] = useState(false);

	const selectedSubject = subjects.find((s) => s.id === selectedSubjectId)!;

	const handleAddSubject = () => {
		if (!newSubjectName.trim()) return;
		const newSubject: Subject = {
			id: Date.now().toString(),
			name: newSubjectName.trim(),
			tasks: [],
		};
		setSubjects((prev) => [...prev, newSubject]);
		setSelectedSubjectId(newSubject.id);
		setNewSubjectName("");
	};

	const handleAddTask = () => {
		if (!newTaskText.trim()) return;
		const updatedSubjects = subjects.map((subject) =>
			subject.id === selectedSubjectId
				? {
						...subject,
						tasks: [
							...subject.tasks,
							{
								id: Date.now().toString(),
								text: newTaskText,
								completed: false,
								tag: "Work",
							},
						],
				  }
				: subject
		);
		setSubjects(updatedSubjects);
		setNewTaskText("");
	};

	const toggleTask = (taskId: string) => {
		setSubjects((prev) =>
			prev.map((subject) =>
				subject.id === selectedSubjectId
					? {
							...subject,
							tasks: subject.tasks.map((task) =>
								task.id === taskId
									? { ...task, completed: !task.completed }
									: task
							),
					  }
					: subject
			)
		);
	};

	const deleteTask = (taskId: string) => {
		setSubjects((prev) =>
			prev.map((subject) =>
				subject.id === selectedSubjectId
					? {
							...subject,
							tasks: subject.tasks.filter((task) => task.id !== taskId),
					  }
					: subject
			)
		);
	};

	return (
		<>
			<Card className="h-full bg-gradient-to-br from-zinc-50 via-zinc-95 to-zinc-160 dark:from-[#121212] dark:via-[#171717] dark:to-[#19191a]">
				<CardHeader className="pb-3 flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-2xl w-full font-semibold flex justify-between items-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="flex items-center gap-1 text-xl tracking-normal px-2 py-1"
									>
										{selectedSubject.name}
										<ChevronDown className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									{subjects.map((subject) => (
										<DropdownMenuItem
											key={subject.id}
											onClick={() => setSelectedSubjectId(subject.id)}
										>
											{subject.name}
										</DropdownMenuItem>
									))}
									<DropdownMenuItem
										className="text-emerald-400 hover:text-emerald-500 font-semibold"
										onClick={() => setShowAddSubjectDialog(true)}
									>
										Add new Subject
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Badge
								variant="outline"
								className="ml-2 font-normal tracking-normal p-1 px-2"
							>
								{selectedSubject.tasks.filter((t) => !t.completed).length}{" "}
								remaining
							</Badge>
						</CardTitle>
					</div>
				</CardHeader>

				<CardContent>
					<div className="flex mb-4">
						<Input
							placeholder="Add a new task..."
							value={newTaskText}
							onChange={(e) => setNewTaskText(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleAddTask();
							}}
							className="mr-2"
						/>
						<Button onClick={handleAddTask} size="icon">
							<Plus className="h-4 w-4" />
						</Button>
					</div>

					<div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
						{selectedSubject.tasks.map((task) => (
							<div
								key={task.id}
								className={`flex items-center p-3 rounded-md border ${
									task.completed
										? "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
										: "bg-white dark:bg-input border-zinc-200 dark:border-zinc-700"
								} transition-colors`}
							>
								<GripVertical className="mr-2 text-zinc-400 h-4 w-4" />
								<Button
									variant="ghost"
									size="sm"
									className={`rounded-full p-0 w-5 h-5 mr-3 ${
										task.completed
											? "bg-emerald-500 text-white hover:bg-emerald-600"
											: "border border-zinc-300 dark:border-zinc-600"
									}`}
									onClick={() => toggleTask(task.id)}
								>
									{task.completed && <Check className="h-3 w-3" />}
								</Button>
								<span
									className={`flex-grow ${
										task.completed ? "line-through text-zinc-400" : ""
									}`}
								>
									{task.text}
								</span>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											size="sm"
											className="ml-2 h-8 w-8 p-0"
										>
											<Tag className="h-4 w-4 text-zinc-500" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>Work</DropdownMenuItem>
										<DropdownMenuItem>Personal</DropdownMenuItem>
										<DropdownMenuItem>Health</DropdownMenuItem>
										<DropdownMenuItem>Learning</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>

								<Button
									variant="ghost"
									size="sm"
									onClick={() => deleteTask(task.id)}
									className="ml-2 h-8 w-8 p-0 text-zinc-500 hover:text-red-500"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))}

						{selectedSubject.tasks.length === 0 && (
							<div className="text-center py-8 text-zinc-400 dark:text-zinc-500">
								No tasks yet. Add one to get started!
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Dialog for adding new subject */}
			<Dialog
				open={showAddSubjectDialog}
				onOpenChange={setShowAddSubjectDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add a new subject</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<Input
							placeholder="Subject name (e.g., Physics)"
							value={newSubjectName}
							onChange={(e) => setNewSubjectName(e.target.value)}
						/>
						<Button
							onClick={() => {
								handleAddSubject();
								setShowAddSubjectDialog(false);
							}}
						>
							Add Subject
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

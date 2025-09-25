// lib/taskService.ts
import { db } from "./firebaseConfig";
import {
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { Subject } from "@/types/task";

const SUBJECTS_COLLECTION = "subjects";

// Add new subject
export async function addSubject(name: string) {
	await addDoc(collection(db, SUBJECTS_COLLECTION), {
		name,
		tasks: [],
	});
}

// Listen to all subjects in real-time
export function listenToSubjects(callback: (subjects: Subject[]) => void) {
	return onSnapshot(collection(db, SUBJECTS_COLLECTION), (snapshot) => {
		const data = snapshot.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as Subject)
		);
		callback(data);
	});
}

// Add task to subject
export async function addTask(subjectId: string, task: { title: string }) {
	const docRef = doc(db, SUBJECTS_COLLECTION, subjectId);
	const snapshot = await getDocs(
		query(
			collection(db, SUBJECTS_COLLECTION),
			where("__name__", "==", subjectId)
		)
	);

	if (!snapshot.empty) {
		const docSnap = snapshot.docs[0];
		const data = docSnap.data() as Subject;
		const updatedTasks = [
			...(data.tasks || []),
			{ id: crypto.randomUUID(), title: task.title, done: false },
		];
		await updateDoc(docRef, { tasks: updatedTasks });
	}
}

// Toggle task done
export async function toggleTask(subject: Subject, taskId: string) {
	const updatedTasks = subject.tasks.map((task) =>
		task.id === taskId ? { ...task, done: !task.done } : task
	);
	await updateDoc(doc(db, SUBJECTS_COLLECTION, subject.id), {
		tasks: updatedTasks,
	});
}

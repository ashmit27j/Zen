"use client";

import { useEffect } from "react";
import { useTimer } from "@/context/timer-context";
import { useTask } from "@/context/task-context";

export function useKeyboardShortcuts() {
	const { startTimer, pauseTimer, resetTimer, setTimerMode, isActive } =
		useTimer();
	const { addTask } = useTask();

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			// Ignore if user is typing in an input field
			if (
				event.target instanceof HTMLInputElement ||
				event.target instanceof HTMLTextAreaElement
			) {
				return;
			}

			// Normalize key
			const key = event.key.toLowerCase();

			switch (key) {
				case " ":
					event.preventDefault();
					if (isActive) {
						pauseTimer();
					} else {
						startTimer();
					}
					break;
				case "r":
					event.preventDefault();
					resetTimer();
					break;
				case "!": // Shift + 1
					event.preventDefault();
					if (event.shiftKey) {
						setTimerMode("focus");
					}
					break;
				case "@": // Shift + 2
					event.preventDefault();
					if (event.shiftKey) {
						setTimerMode("shortBreak");
					}
					break;
				case "#": // Shift + 3
					event.preventDefault();
					if (event.shiftKey) {
						setTimerMode("longBreak");
					}
					break;
				case "t":
					event.preventDefault();
					const taskInput = document.querySelector(
						'input[placeholder*="Add a new task"]'
					) as HTMLInputElement;
					if (taskInput) {
						taskInput.focus();
					}
					break;
				case "m":
					event.preventDefault();
					console.log("Toggle music");
					break;
			}
		};

		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [isActive, startTimer, pauseTimer, resetTimer, setTimerMode, addTask]);
}

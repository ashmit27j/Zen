"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

interface TimerContextType {
	timeLeft: number;
	setTimeLeft: (v: number) => void;
	isActive: boolean;
	timerMode: "focus" | "shortBreak" | "longBreak";
	sessionsToday: number;
	totalSessions: number;
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
	setTimerMode: (mode: "focus" | "shortBreak" | "longBreak") => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
	const { focusDuration, shortBreakDuration, longBreakDuration } =
		useSettings();

	const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
	const [isActive, setIsActive] = useState(false);
	const [timerMode, setTimerMode] = useState<
		"focus" | "shortBreak" | "longBreak"
	>("focus");
	const [sessionsToday, setSessionsToday] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("zen-sessions-today");
			return saved ? JSON.parse(saved) : 0;
		}
		return 0;
	});
	const [totalSessions, setTotalSessions] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("zen-total-sessions");
			return saved ? JSON.parse(saved) : 0;
		}
		return 0;
	});

	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = new Audio("/notification.mp3");
		audioRef.current.load();
	}, []);

	const unlockAudio = () => {
		if (audioRef.current) {
			audioRef.current
				.play()
				.then(() => {
					audioRef.current?.pause();
					audioRef.current.currentTime = 0;
				})
				.catch(() => {});
		}
	};

	const startTimer = () => {
		unlockAudio();
		setIsActive(true);
	};

	useEffect(() => {
		if (isActive && timeLeft === 0 && audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play().catch(() => {});
		}
	}, [isActive, timeLeft]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const lastDate = localStorage.getItem("zen-last-date");
			const today = new Date().toDateString();
			if (lastDate !== today) {
				setSessionsToday(0);
				localStorage.setItem("zen-last-date", today);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("zen-sessions-today", JSON.stringify(sessionsToday));
		localStorage.setItem("zen-total-sessions", JSON.stringify(totalSessions));
	}, [sessionsToday, totalSessions]);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);
		} else if (isActive && timeLeft === 0) {
			setIsActive(false);

			if (timerMode === "focus") {
				setSessionsToday((prev: number) => prev + 1);
				setTotalSessions((prev: number) => prev + 1);
			}

			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play().catch(() => {});
			}

			setTimeout(() => {
				if (timerMode === "focus") {
					setTimerMode("shortBreak");
					setTimeLeft(shortBreakDuration * 60);
				} else if (timerMode === "shortBreak") {
					setTimerMode("longBreak");
					setTimeLeft(longBreakDuration * 60);
				} else {
					setTimerMode("focus");
					setTimeLeft(focusDuration * 60);
				}
				setIsActive(true);
			}, 500);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [
		isActive,
		timeLeft,
		timerMode,
		focusDuration,
		shortBreakDuration,
		longBreakDuration,
	]);

	useEffect(() => {
		let newTime;
		if (timerMode === "focus") {
			newTime = focusDuration * 60;
		} else if (timerMode === "shortBreak") {
			newTime = shortBreakDuration * 60;
		} else {
			newTime = longBreakDuration * 60;
		}
		setTimeLeft(newTime);
	}, [timerMode, focusDuration, shortBreakDuration, longBreakDuration]);

	const pauseTimer = () => setIsActive(false);

	const resetTimer = () => {
		if (timerMode === "focus") {
			setTimeLeft(focusDuration * 60);
		} else if (timerMode === "shortBreak") {
			setTimeLeft(shortBreakDuration * 60);
		} else {
			setTimeLeft(longBreakDuration * 60);
		}
	};

	return (
		<TimerContext.Provider
			value={{
				timeLeft,
				setTimeLeft,
				isActive,
				timerMode,
				sessionsToday,
				totalSessions,
				startTimer,
				pauseTimer,
				resetTimer,
				setTimerMode,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
}

export function useTimer() {
	const context = useContext(TimerContext);
	if (context === undefined) {
		throw new Error("useTimer must be used within a TimerProvider");
	}
	return context;
}

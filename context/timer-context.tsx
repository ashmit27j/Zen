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
				.catch((err) => console.log("Unlock failed", err));
		}
	};

	const startTimer = () => {
		unlockAudio(); // ✅ Unlock audio on first interaction
		setIsActive(true);
	};

	useEffect(() => {
		if (isActive && timeLeft === 0 && audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current
				.play()
				.catch((err) => console.error("Playback failed:", err));
		}
	}, [isActive, timeLeft]);

	// ✅ Preload audio
	useEffect(() => {
		if (typeof window !== "undefined") {
			const audio = new Audio("/notification.mp3");
			audio.load();
			audioRef.current = audio;
		}
	}, []);

	// ✅ Reset sessions if it's a new day
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

	// ✅ Save session counts
	useEffect(() => {
		localStorage.setItem("zen-sessions-today", JSON.stringify(sessionsToday));
		localStorage.setItem("zen-total-sessions", JSON.stringify(totalSessions));
	}, [sessionsToday, totalSessions]);

	// ✅ Timer countdown
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

			// ✅ Play sound safely
			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current
					.play()
					.catch((err) => console.error("Playback failed:", err));
			}
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, timeLeft, timerMode]);

	// ✅ Update duration when mode or settings change
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
		setIsActive(false);
	}, [timerMode, focusDuration, shortBreakDuration, longBreakDuration]);

	// const startTimer = () => {
	// 	// 🔑 Unlock audio playback on first click
	// 	if (audioRef.current) {
	// 		const audio = audioRef.current;
	// 		audio.currentTime = 0;
	// 		audio.play().catch((err) => console.error("Playback failed:", err));
	// 	}
	// 	setIsActive(true);
	// };

	const pauseTimer = () => setIsActive(false);

	const resetTimer = () => {
		if (timerMode === "focus") {
			setTimeLeft(focusDuration * 60);
		} else if (timerMode === "shortBreak") {
			setTimeLeft(shortBreakDuration * 60);
		} else {
			setTimeLeft(longBreakDuration * 60);
		}
		setIsActive(false);
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

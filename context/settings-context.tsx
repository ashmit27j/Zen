// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// interface SettingsContextType {
// 	focusDuration: number;
// 	shortBreakDuration: number;
// 	longBreakDuration: number;
// 	setFocusDuration: (v: number) => void;
// 	setShortBreakDuration: (v: number) => void;
// 	setLongBreakDuration: (v: number) => void;
// }

// const SettingsContext = createContext<SettingsContextType | undefined>(
// 	undefined
// );

// export const SettingsProvider = ({ children }: { children: ReactNode }) => {
// 	const [focusDuration, setFocusDuration] = useState(25);
// 	const [shortBreakDuration, setShortBreakDuration] = useState(5);
// 	const [longBreakDuration, setLongBreakDuration] = useState(15);

// 	return (
// 		<SettingsContext.Provider
// 			value={{
// 				focusDuration,
// 				shortBreakDuration,
// 				longBreakDuration,
// 				setFocusDuration,
// 				setShortBreakDuration,
// 				setLongBreakDuration,
// 			}}
// 		>
// 			{children}
// 		</SettingsContext.Provider>
// 	);
// };

// export const useSettings = () => {
// 	const context = useContext(SettingsContext);
// 	if (!context)
// 		throw new Error("useSettings must be used within SettingsProvider");
// 	return context;
// };

"use client";

import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

interface SettingsContextType {
	focusDuration: number;
	shortBreakDuration: number;
	longBreakDuration: number;
	muted: boolean;
	setFocusDuration: (v: number) => void;
	setShortBreakDuration: (v: number) => void;
	setLongBreakDuration: (v: number) => void;
	setMuted: (v: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
	undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [focusDuration, setFocusDuration] = useState(25);
	const [shortBreakDuration, setShortBreakDuration] = useState(5);
	const [longBreakDuration, setLongBreakDuration] = useState(15);
	const [muted, setMuted] = useState(false);

	// ✅ Optional: persist settings in localStorage
	useEffect(() => {
		const saved = localStorage.getItem("zenSettings");
		if (saved) {
			const parsed = JSON.parse(saved);
			setFocusDuration(parsed.focusDuration ?? 25);
			setShortBreakDuration(parsed.shortBreakDuration ?? 5);
			setLongBreakDuration(parsed.longBreakDuration ?? 15);
			setMuted(parsed.muted ?? false);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			"zenSettings",
			JSON.stringify({
				focusDuration,
				shortBreakDuration,
				longBreakDuration,
				muted,
			})
		);
	}, [focusDuration, shortBreakDuration, longBreakDuration, muted]);

	return (
		<SettingsContext.Provider
			value={{
				focusDuration,
				shortBreakDuration,
				longBreakDuration,
				muted,
				setFocusDuration,
				setShortBreakDuration,
				setLongBreakDuration,
				setMuted,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (!context)
		throw new Error("useSettings must be used within SettingsProvider");
	return context;
};

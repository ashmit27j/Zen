"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
	focusDuration: number;
	shortBreakDuration: number;
	longBreakDuration: number;
	setFocusDuration: (v: number) => void;
	setShortBreakDuration: (v: number) => void;
	setLongBreakDuration: (v: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
	undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [focusDuration, setFocusDuration] = useState(25);
	const [shortBreakDuration, setShortBreakDuration] = useState(5);
	const [longBreakDuration, setLongBreakDuration] = useState(15);

	return (
		<SettingsContext.Provider
			value={{
				focusDuration,
				shortBreakDuration,
				longBreakDuration,
				setFocusDuration,
				setShortBreakDuration,
				setLongBreakDuration,
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

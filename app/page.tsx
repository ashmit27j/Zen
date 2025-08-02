"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { PomodoroTimer } from "@/components/pomodoro-timer";
import { TaskManager } from "@/components/task-manager";
import { MusicPlayer } from "@/components/music-player";
// import { Notes } from "@/components/notes";
// import { GoalsChecklist } from "@/components/goals-checklist";
// import { MotivationalQuote } from "@/components/motivational-quote";
import { TimerProvider } from "@/context/timer-context";
import { TaskProvider } from "@/context/task-context";
import { ThemeProvider } from "next-themes";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { TopBar } from "@/components/ui/top-bar";
import { Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsProvider } from "@/context/settings-context";

function AppContent() {
	const [isFullscreen, setIsFullscreen] = useState(false);
	// const [showQuote, setShowQuote] = useState(false);
	const [showTop, setShowTop] = useState(true);

	useKeyboardShortcuts();

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-background dark:to-[#0a0a0a] transition-colors duration-300 relative">
			{/* Floating toggle button (top-right) */}
			<div className="absolute bottom-[20px] right-[20px] z-50 bg-card">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setShowTop(prev => !prev)}
					aria-label="Toggle Header and TopBar"
				>
					<Infinity className="w-5 h-5" />
				</Button>
			</div>

			{/* Conditionally show Header */}
			{showTop && !isFullscreen && <Header />}

			<div className="container mx-auto px-4 py-8 space-y-6">
				{showTop && !isFullscreen && <TopBar />}

				<div
					className={`grid gap-6 ${
						isFullscreen ? "" : "md:grid-cols-2 lg:grid-cols-3"
					}`}
				>
					<div
						className={`${
							isFullscreen
								? "flex justify-center items-center min-h-[100vh]"
								: "lg:col-span-1 flex flex-col h-full w-full"
						}`}
					>
						<PomodoroTimer
							isFullscreen={isFullscreen}
							setIsFullscreen={setIsFullscreen}
						/>
					</div>

					{!isFullscreen && (
						<>
							<div className="lg:col-span-1">
								<TaskManager />
							</div>

							<div className="md:col-span-2 lg:col-span-1">
								<div className="grid gap-6">
									<MusicPlayer />
									{/* <Notes />
										<GoalsChecklist /> */}
								</div>
							</div>
						</>
					)}
				</div>

			</div>
		</div>
	);
}

export default function Home() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<SettingsProvider>
				<TimerProvider>
					<TaskProvider>
						<AppContent />
					</TaskProvider>
				</TimerProvider>
			</SettingsProvider>
		</ThemeProvider>
	);
}

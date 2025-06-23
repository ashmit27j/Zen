"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { TaskManager } from "@/components/task-manager"
import { MusicPlayer } from "@/components/music-player"
import { Notes } from "@/components/notes"
import { GoalsChecklist } from "@/components/goals-checklist"
import { MotivationalQuote } from "@/components/motivational-quote"
import { TimerProvider } from "@/context/timer-context"
import { TaskProvider } from "@/context/task-context"
import { ThemeProvider } from "next-themes";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
	
function AppContent() {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showQuote, setShowQuote] = useState(false);

	useKeyboardShortcuts();

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-300">
			{!isFullscreen && <Header />}

			<main className="container mx-auto px-4 py-8">
				<div
					className={`grid gap-6 ${
						isFullscreen ? "" : "md:grid-cols-2 lg:grid-cols-3"
					}`}
				>
					<div
						className={`${
							isFullscreen
								? "flex justify-center items-center min-h-[80vh]"
								: "lg:col-span-1"
						}`}
					>
						<PomodoroTimer
							isFullscreen={isFullscreen}
							setIsFullscreen={setIsFullscreen}
							showQuote={showQuote}
							setShowQuote={setShowQuote}
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
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<Notes />
										<GoalsChecklist />
									</div>
								</div>
							</div>
						</>
					)}
				</div>

				{showQuote && isFullscreen && <MotivationalQuote />}
			</main>
		</div>
	);
}

export default function Home() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<TimerProvider>
				<TaskProvider>
					<AppContent />
				</TaskProvider>
			</TimerProvider>
		</ThemeProvider>
	);
}

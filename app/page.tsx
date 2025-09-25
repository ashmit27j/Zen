"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

import { Header } from "@/components/header";
import { PomodoroTimer } from "@/components/pomodoro-timer";
import { TaskManager } from "@/components/task-manager";
import { MusicPlayer } from "@/components/music-player";
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
	const [showTop, setShowTop] = useState(true);

	useKeyboardShortcuts();

	return (
		<div className="w-screen min-h-screen overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-background dark:to-[#0a0a0a] transition-colors duration-300 relative">
			<div className="absolute bottom-5 right-5 z-50 bg-card">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setShowTop((prev) => !prev)}
					aria-label="Toggle Header and TopBar"
				>
					<Infinity className="w-5 h-5" />
				</Button>
			</div>

			{showTop && !isFullscreen && <Header />}

			<div className="w-full h-full px-4 py-8 space-y-6">
				{showTop && !isFullscreen && <TopBar />}
				{/* this it the container div */}
				<div
					className={`grid gap-6 w-full h-[calc(100vh-250px)] ${
						isFullscreen ? "" : "md:grid-cols-2 lg:grid-cols-3"
					}`}
				>
					{/* below is the pomodoro div */}
					<div
						className={`w-full h-full ${
							isFullscreen
								? "flex justify-center items-center min-h-screen"
								: "lg:col-span-1 flex flex-col"
						}`}
					>
						<PomodoroTimer
							isFullscreen={isFullscreen}
							setIsFullscreen={setIsFullscreen}
						/>
					</div>

					{!isFullscreen && (
						<>
							<div className="lg:col-span-1 w-full h-full">
								<TaskManager />
							</div>

							<div className="md:col-span-2 lg:col-span-1 w-full h-full">
								<div className="grid gap-6 h-full">
									<MusicPlayer />
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
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				router.push("/auth"); // Redirect if not logged in
			} else {
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, [router]);

	if (loading) return null; // Prevent UI flicker

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

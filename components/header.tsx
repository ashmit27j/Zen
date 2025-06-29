"use client";

import {
	Moon,
	Sun,
	Settings,
	Volume2,
	VolumeX,
	X,
	Cog,
	Clock,
	CheckSquare,
	Music2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Optional: for merging classes

const settingsTabs = [
	{ key: "general", label: "General", icon: Cog },
	{ key: "pomodoro", label: "Pomodoro", icon: Clock },
	{ key: "tasks", label: "Tasks", icon: CheckSquare },
	{ key: "music", label: "Music", icon: Music2 },
];

export function Header() {
	const { theme, setTheme } = useTheme();
	const [muted, setMuted] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [activeTab, setActiveTab] = useState("general");

	const handleMuteToggle = () => {
		setMuted((prev) => !prev);
	};

	return (
		<>
			<header className="border-b border-zinc-200 dark:border-zinc-800">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-light tracking-wide">
						<span className="font-medium">Zen</span>
					</h1>

					<div className="flex items-center gap-2">
						{/* Mute Toggle */}
						<Button
							variant="ghost"
							size="icon"
							onClick={handleMuteToggle}
							aria-label="Toggle mute"
						>
							{muted ? (
								<VolumeX className="h-5 w-5" />
							) : (
								<Volume2 className="h-5 w-5" />
							)}
						</Button>

						{/* Theme Toggle */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							aria-label="Toggle theme"
						>
							<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						</Button>

						{/* Settings */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowSettings(true)}
							aria-label="Open settings"
						>
							<Settings className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</header>

			{/* Settings Modal */}
			<Dialog open={showSettings} onOpenChange={setShowSettings}>
				<DialogContent className="max-w-4xl p-0 overflow-hidden">
					{/* Close */}
					<div className="flex justify-end p-4 border-b">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowSettings(false)}
							aria-label="Close settings"
						>
							<X className="h-5 w-5" />
						</Button>
					</div>

					<div className="flex h-[500px]">
						{/* Sidebar with Icons */}
						<aside className="w-56 border-r bg-muted/40 p-4 space-y-2">
							{settingsTabs.map(({ key, label, icon: Icon }) => (
								<Button
									key={key}
									variant={activeTab === key ? "secondary" : "ghost"}
									className="w-full justify-start gap-2 capitalize"
									onClick={() => setActiveTab(key)}
								>
									<Icon className="w-4 h-4" />
									{label}
								</Button>
							))}
						</aside>

						{/* Content Panel */}
						<section className="flex-1 p-6 overflow-y-auto">
							{activeTab === "general" && (
								<div>
									<h2 className="text-lg font-medium mb-4">General Settings</h2>
									<ul className="space-y-2 text-sm">
										<li>🌓 Theme toggle</li>
										<li>🔊 Mute toggle</li>
										<li>📦 Local storage reset</li>
									</ul>
								</div>
							)}
							{activeTab === "pomodoro" && (
								<div>
									<h2 className="text-lg font-medium mb-4">
										Pomodoro Settings
									</h2>
									<ul className="space-y-2 text-sm">
										<li>⏱️ Focus duration: 25 mins</li>
										<li>☕ Break duration: 5 mins</li>
										<li>🎯 Long break: 15 mins</li>
										<li>🔁 Auto start next cycle: On/Off</li>
									</ul>
								</div>
							)}
							{activeTab === "tasks" && (
								<div>
									<h2 className="text-lg font-medium mb-4">Task Settings</h2>
									<ul className="space-y-2 text-sm">
										<li>📌 Priority system (Low, Med, High)</li>
										<li>🗂️ Categories or Labels</li>
										<li>📅 Due date reminders</li>
									</ul>
								</div>
							)}
							{activeTab === "music" && (
								<div>
									<h2 className="text-lg font-medium mb-4">
										Music Player Settings
									</h2>
									<ul className="space-y-2 text-sm">
										<li>🎼 Playlist style: Shuffle / Loop</li>
										<li>🔊 Volume control</li>
										<li>🎧 Music source: Local / External</li>
									</ul>
								</div>
							)}
						</section>
					</div>

					{/* Footer */}
					<div className="flex justify-end gap-2 border-t p-4">
						<Button variant="ghost" onClick={() => setShowSettings(false)}>
							Discard changes
						</Button>
						<Button onClick={() => setShowSettings(false)}>Save</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

"use client";

import {
	Menu,
	LayoutDashboard,
	StickyNote,
	MessageCircle,
	YoutubeIcon,
	GraduationCap,
	Calculator,
	ClipboardList,
	Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MuteToggle from "./muteToggle";
import ThemeToggle from "./themeToggle";
import SettingsDialog from "./settingsDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export function Header() {
	const [showSettings, setShowSettings] = useState(false);
	const isSignedIn = false; // 🔑 Replace with your auth state later

	return (
		<>
			<header className="border-b border-zinc-200 dark:border-zinc-800 relative z-50 bg-background">
				<div className="px-4 py-4 flex justify-between items-center w-full">
					{/* Left side: Hamburger menu */}
					<div className="flex items-center gap-3">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" aria-label="Open menu">
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent
								side="left"
								className="w-64 bg-background shadow-lg"
							>
								<nav className="flex flex-col gap-4 mt-6">
									<Button variant="ghost" className="justify-start gap-2">
										<LayoutDashboard className="h-4 w-4" /> Dashboard
									</Button>
									<Button variant="ghost" className="justify-start gap-2">
										<StickyNote className="h-4 w-4" /> Notes
									</Button>
									<Button variant="ghost" className="justify-start gap-2">
										<MessageCircle className="h-4 w-4" /> ChatBot
									</Button>
									<Button variant="ghost" className="justify-start gap-2">
										<YoutubeIcon className="h-4 w-4" /> YouTube Playlists
									</Button>
									<Button variant="ghost" className="justify-start gap-2">
										<GraduationCap className="h-4 w-4" /> College Portal
									</Button>
									<Button variant="ghost" className="justify-start gap-2">
										<Calculator className="h-4 w-4" /> Scientific Calci
									</Button>
									<Button variant="ghost" className="justify-start gap-2">
										<ClipboardList className="h-4 w-4" /> Attendance Calc
									</Button>
								</nav>
							</SheetContent>
						</Sheet>

						<h1 className="text-2xl font-light tracking-wide">
							<span className="font-medium">Zen</span>
						</h1>
					</div>

					{/* Right side: Toggles + Settings + Login/Profile */}
					<div className="flex items-center gap-2">
						<MuteToggle />
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowSettings(true)}
							aria-label="Open settings"
						>
							<Settings className="h-5 w-5" />
						</Button>

						{isSignedIn ? (
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full overflow-hidden"
							>
								<Image
									src="/user-avatar.jpg"
									alt="Profile"
									width={32}
									height={32}
								/>
							</Button>
						) : (
							<Button className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-md px-4">
								Login
							</Button>
						)}
					</div>
				</div>
			</header>

			<SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
		</>
	);
}

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
	ChevronDown,
	ChevronRight,
	Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MuteToggle from "./muteToggle";
import ThemeToggle from "./themeToggle";
import SettingsDialog from "./settingsDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
	const [showSettings, setShowSettings] = useState(false);
	const [chatbotOpen, setChatbotOpen] = useState(false);
	const isSignedIn = false; // 🔑 Replace with your auth state later
	const pathname = usePathname();

	const isActive = (path: string) =>
		pathname === path
			? "bg-zinc-200 dark:bg-zinc-700"
			: "hover:bg-zinc-100 dark:hover:bg-zinc-800";

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
								{/* Sidebar Top Branding */}
								<div className="flex items-center gap-2 mb-6 px-2">
									{/* <Image
										src="/zen-logo.png"
										alt="Zen Logo"
										width={28}
										height={28}
										className="rounded"
									/> */}
									<h1 className="text-2xl font-light tracking-wide">
										<span className="font-medium">Zen</span>
									</h1>
								</div>

								<nav className="flex flex-col gap-2">
									<Button
										variant="ghost"
										className={`justify-start gap-2 w-full ${isActive("/")}`}
									>
										<LayoutDashboard className="h-4 w-4" /> Dashboard
									</Button>
									<a
										href="https://drive.google.com/drive/folders/1G6b4WjhnGJF8yOnvmVo4mf7RPSTTZ-ca?usp=sharing"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											variant="ghost"
											className={`justify-start gap-2 w-full ${isActive(
												"/notes"
											)}`}
										>
											<StickyNote className="h-4 w-4" /> Notes
										</Button>
									</a>

									{/* ChatBot with Expandable Items */}
									<div>
										<Button
											variant="ghost"
											className="justify-between gap-2 w-full"
											onClick={() => setChatbotOpen(!chatbotOpen)}
										>
											<span className="flex items-center gap-2">
												<MessageCircle className="h-4 w-4" /> ChatBot
											</span>
											{chatbotOpen ? (
												<ChevronDown className="h-4 w-4" />
											) : (
												<ChevronRight className="h-4 w-4" />
											)}
										</Button>
										{chatbotOpen && (
											<div className="ml-6 mt-1 flex flex-col gap-1">
												<Button
													variant="ghost"
													className="justify-start gap-2 w-full"
												>
													<Bot className="h-4 w-4" /> Chat with ZenBot
												</Button>
												<Button
													variant="ghost"
													className="justify-start gap-2 w-full"
												>
													<Bot className="h-4 w-4" /> AI Study Helper
												</Button>
											</div>
										)}
									</div>

									<a
										href="https://www.youtube.com/@Ashmithehe"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											variant="ghost"
											className={`justify-start gap-2 w-full ${isActive(
												"/youtube"
											)}`}
										>
											<YoutubeIcon className="h-4 w-4" /> YouTube Playlists
										</Button>
									</a>
									<a
										href="https://portal.svkm.ac.in/usermgmt/login"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											variant="ghost"
											className={`justify-start gap-2 w-full ${isActive(
												"/college"
											)}`}
										>
											<GraduationCap className="h-4 w-4" /> College Portal
										</Button>
									</a>
									<a
										href="https://www.desmos.com/scientific"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											variant="ghost"
											className={`justify-start gap-2 w-full ${isActive(
												"/calculator"
											)}`}
										>
											<Calculator className="h-4 w-4" /> Scientific Calci
										</Button>
									</a>
									<Button
										variant="ghost"
										className={`justify-start gap-2 w-full ${isActive(
											"/attendance"
										)}`}
									>
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
							<a href="/login">
								<Button className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-md px-4">
									Login
								</Button>
							</a>
						)}
					</div>
				</div>
			</header>

			<SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
		</>
	);
}

// "use client";

// import { Settings } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import MuteToggle from "./muteToggle";
// import ThemeToggle from "./themeToggle";
// import SettingsDialog from "./settingsDialog";

// export function Header() {
// 	const [showSettings, setShowSettings] = useState(false);

// 	return (
// 		<>
// 			<header className="border-b border-zinc-200 dark:border-zinc-800">
// 				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
// 					<h1 className="text-2xl font-light tracking-wide">
// 						<span className="font-medium">Zen</span>
// 					</h1>

// 					<div className="flex items-center gap-2">
// 						<MuteToggle />
// 						<ThemeToggle />
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							onClick={() => setShowSettings(true)}
// 							aria-label="Open settings"
// 						>
// 							<Settings className="h-5 w-5" />
// 						</Button>
// 					</div>
// 				</div>
// 			</header>

// 			<SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
// 		</>
// 	);
// }

"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MuteToggle from "./muteToggle";
import ThemeToggle from "./themeToggle";
import SettingsDialog from "./settingsDialog";

export function Header() {
	const [showSettings, setShowSettings] = useState(false);

	return (
		<>
			<header className="w-full border-b border-zinc-200 dark:border-zinc-800 px-4 py-4 flex justify-between items-center">
				<h1 className="text-2xl font-light tracking-wide">
					<span className="font-medium">Zen</span>
				</h1>

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
				</div>
			</header>

			<SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
		</>
	);
}

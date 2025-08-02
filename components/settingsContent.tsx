"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/context/settings-context";

export default function SettingsContent({ activeTab }: { activeTab: string }) {
	const {
		focusDuration,
		shortBreakDuration,
		longBreakDuration,
		setFocusDuration,
		setShortBreakDuration,
		setLongBreakDuration,
	} = useSettings();

	return (
		<section className="flex-1 p-6 overflow-y-auto">
			{activeTab === "general" && (
				<div>
					<h2 className="text-lg font-medium mb-4">General Settings</h2>
					<ul className="space-y-2 text-sm">
						<li>Theme toggle</li>
						<li>Mute toggle</li>
						<li>Local storage reset</li>
					</ul>
				</div>
			)}

			{activeTab === "pomodoro" && (
				<div>
					<h2 className="text-lg font-medium mb-4">Pomodoro Settings</h2>
					<div className="space-y-4 text-sm">
						<div>
							<Label>Focus duration (minutes)</Label>
							<Input
								type="number"
								className="mt-1 w-full"
								value={focusDuration}
								onChange={(e) => setFocusDuration(Number(e.target.value))}
							/>
						</div>
						<div>
							<Label>Short break duration</Label>
							<Input
								type="number"
								className="mt-1 w-full"
								value={shortBreakDuration}
								onChange={(e) => setShortBreakDuration(Number(e.target.value))}
							/>
						</div>
						<div>
							<Label>Long break duration</Label>
							<Input
								type="number"
								className="mt-1 w-full"
								value={longBreakDuration}
								onChange={(e) => setLongBreakDuration(Number(e.target.value))}
							/>
						</div>
					</div>
				</div>
			)}

			{activeTab === "tasks" && (
				<div>
					<h2 className="text-lg font-medium mb-4">Task Settings</h2>
					<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
						<li>Priority system (Low, Medium, High)</li>
						<li>Categories or Labels</li>
						<li>Due date reminders</li>
					</ul>
				</div>
			)}

			{activeTab === "music" && (
				<div>
					<h2 className="text-lg font-medium mb-4">Music Player Settings</h2>
					<ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
						<li>Playlist style: Shuffle / Loop</li>
						<li>Volume control</li>
						<li>Music source: Local / External</li>
					</ul>
				</div>
			)}
		</section>
	);
}

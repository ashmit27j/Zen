"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import SettingsSidebar from "./settingsSidebar";
import SettingsContent from "./settingsContent";

const settingsTabs = ["general", "pomodoro", "tasks", "music"];

export default function SettingsDialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const [activeTab, setActiveTab] = useState("general");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl p-0 overflow-hidden [&>button.absolute]:hidden">
				<div className="flex justify-end p-4 border-b">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => onOpenChange(false)}
						aria-label="Close settings"
					>
						<X className="h-5 w-5" />
					</Button>
				</div>

				<div className="flex h-[500px]">
					<SettingsSidebar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						tabs={settingsTabs}
					/>
					<SettingsContent activeTab={activeTab} />
				</div>

				<div className="flex justify-end gap-2 border-t p-4">
					<Button variant="ghost" onClick={() => onOpenChange(false)}>
						Discard changes
					</Button>
					<Button onClick={() => onOpenChange(false)}>Save</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

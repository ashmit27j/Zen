"use client";

import { Button } from "@/components/ui/button";
import { Cog, Clock, CheckSquare, Music2 } from "lucide-react";

const iconMap: Record<string, any> = {
	general: Cog,
	pomodoro: Clock,
	tasks: CheckSquare,
	music: Music2,
};

export default function SettingsSidebar({
	activeTab,
	setActiveTab,
	tabs,
}: {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	tabs: string[];
}) {
	return (
		<aside className="w-56 border-r bg-muted/40 p-4 space-y-2">
			{tabs.map((tab) => {
				const Icon = iconMap[tab];
				return (
					<Button
						key={tab}
						variant={activeTab === tab ? "secondary" : "ghost"}
						className="w-full justify-start gap-2 capitalize"
						onClick={() => setActiveTab(tab)}
					>
						<Icon className="w-4 h-4" />
						{tab}
					</Button>
				);
			})}
		</aside>
	);
}

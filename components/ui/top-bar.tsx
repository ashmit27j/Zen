"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LinkItem {
	title: string;
	url: string;
}

export function TopBar() {
	const [time, setTime] = useState(new Date());
	const [links, setLinks] = useState<LinkItem[]>([
		{ title: "Gmail", url: "https://mail.google.com" },
		{ title: "YouTube", url: "https://youtube.com" },
		{ title: "ChatGPT", url: "https://chat.openai.com" },
	]);
	const [showDialog, setShowDialog] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newUrl, setNewUrl] = useState("");

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	const handleAddLink = () => {
		if (!newTitle || !newUrl) return;
		setLinks([...links, { title: newTitle, url: newUrl }]);
		setNewTitle("");
		setNewUrl("");
		setShowDialog(false);
	};

	return (
		<div className="w-full flex justify-between items-center px-6 py-4">
			{/* Left: Quick Links */}
			<div className="flex items-center gap-3">
				{links.map((link, index) => (
					<a
						key={index}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="w-16 h-16 flex flex-col items-center justify-center rounded-md transition-colors duration-200 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
					>
						<img
							src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
							alt={link.title}
							className="w-6 h-6 mb-1"
						/>
						<span className="text-[10px] text-center text-zinc-700 dark:text-zinc-300">
							{link.title}
						</span>
					</a>
				))}
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setShowDialog(true)}
					className="w-16 h-16 flex items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
				>
					<Plus className="w-5 h-5 text-zinc-400" />
				</Button>
			</div>

			{/* Right: Time */}
			<div className="text-3xl font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
				{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
			</div>

			{/* Modal Dialog */}
			<Dialog open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700">
					<DialogHeader>
						<DialogTitle>Add New Site</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<Input
							placeholder="Website title"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
						/>
						<Input
							placeholder="Website address"
							value={newUrl}
							onChange={(e) => setNewUrl(e.target.value)}
						/>
						<div className="flex justify-end gap-2">
							<Button variant="ghost" onClick={() => setShowDialog(false)}>
								Cancel
							</Button>
							<Button onClick={handleAddLink}>Save</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

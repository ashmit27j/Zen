"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
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
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	const openAddDialog = () => {
		setNewTitle("");
		setNewUrl("");
		setEditingIndex(null);
		setShowDialog(true);
	};

	const openEditDialog = (index: number) => {
		setEditingIndex(index);
		setNewTitle(links[index].title);
		setNewUrl(links[index].url);
		setShowDialog(true);
	};

	const handleSave = () => {
		if (!newTitle || !newUrl) return;
		const updated = [...links];

		if (editingIndex !== null) {
			updated[editingIndex] = { title: newTitle, url: newUrl };
		} else {
			updated.push({ title: newTitle, url: newUrl });
		}

		setLinks(updated);
		setShowDialog(false);
		setNewTitle("");
		setNewUrl("");
		setEditingIndex(null);
	};

	return (
		<div className="flex items-center gap-5">
			{links.map((link, index) => (
				<div
					key={index}
					className="flex flex-col items-center gap-1 relative group"
				>
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="w-16 h-16 rounded-lg border bg-card text-card-foreground shadow-sm
							bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200
							dark:from-[#121212] dark:via-[#171717] dark:to-[#19191a]
							flex items-center justify-center transition hover:brightness-95 dark:hover:brightness-110"
					>
						<img
							src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
							alt={link.title}
							className="w-7 h-7"
						/>
					</a>
					<span className="text-xs text-zinc-700 dark:text-zinc-300">
						{link.title}
					</span>
					<button
						onClick={() => openEditDialog(index)}
						className="absolute top-1 right-1 p-1 rounded hover:bg-zinc-800 hidden group-hover:block"
						title="Edit"
					>
						<Pencil className="w-3.5 h-3.5 text-zinc-400" />
					</button>
				</div>
			))}

			{/* Add Site Button */}
			<div className="flex flex-col items-center gap-1">
				<button
					onClick={openAddDialog}
					className="w-16 h-16 rounded-lg border bg-card text-card-foreground shadow-sm
						bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200
						dark:from-[#121212] dark:via-[#171717] dark:to-[#19191a]
						flex items-center justify-center transition hover:brightness-95 dark:hover:brightness-110"
				>
					<Plus className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
				</button>
				<span className="text-xs text-zinc-700 dark:text-zinc-300">
					Add site
				</span>
			</div>

			{/* Add/Edit Dialog */}
			<Dialog open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editingIndex !== null ? "Edit site" : "Add a new site"}
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<Input
							placeholder="Title (e.g. Twitter)"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
						/>
						<Input
							placeholder="URL (e.g. https://twitter.com)"
							value={newUrl}
							onChange={(e) => setNewUrl(e.target.value)}
						/>
						<Button onClick={handleSave}>
							{editingIndex !== null ? "Save Changes" : "Add"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

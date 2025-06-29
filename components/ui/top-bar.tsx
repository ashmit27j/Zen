"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, MoreVertical } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	const [showTime, setShowTime] = useState(true);
	const [useAmPm, setUseAmPm] = useState(true);
	const [leadingZero, setLeadingZero] = useState(true);

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

	const formattedTime = time.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		hour12: useAmPm,
	});

	// Remove leading zero if needed
	const displayTime =
		!leadingZero && formattedTime.startsWith("0")
			? formattedTime.slice(1)
			: formattedTime;

	return (
		<div className="flex items-center gap-5 justify-between w-full">
			{/* Shortcut Section */}
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
						<span className="text-xs text-zinc-700 dark:text-zinc-300 tracking-normal py-1">
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
					<span className="text-xs text-zinc-700 dark:text-zinc-300 tracking-normal py-1">
						Add site
					</span>
				</div>
			</div>

			{/* Time Display */}
			{showTime ? (
				<div className="relative hidden sm:flex items-center group">
					<span className="text-6xl font-medium text-black dark:text-white">
						{displayTime}
					</span>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="ml-1 p-1 rounded opacity-0 group-hover:opacity-100 transition">
								<MoreVertical className="h-4 w-4 text-black dark:text-white" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setShowTime(false)}>
								Hide Time
							</DropdownMenuItem>
							<hr />
							<DropdownMenuItem onClick={() => setUseAmPm(!useAmPm)}>
								<span className="">
									{useAmPm ? "Remove AM/PM" : "Add AM/PM"}
								</span>
							</DropdownMenuItem>
							<hr />
							<DropdownMenuItem onClick={() => setLeadingZero(!leadingZero)}>
								<span className="">
									{leadingZero ? "Remove Leading 0" : "Add Leading 0"}
								</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<div className="hidden sm:flex items-center ml-auto">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="p-1 rounded">
								<MoreVertical className="h-4 w-4 text-black dark:text-white" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setShowTime(true)}>
								Show Time
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setUseAmPm(!useAmPm)}>
								<span className="text-xs">
									{useAmPm ? "Switch to 24H" : "Switch to AM/PM"}
								</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setLeadingZero(!leadingZero)}>
								<span className="text-xs">
									{leadingZero ? "Remove Leading 0" : "Add Leading 0"}
								</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}

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

						{editingIndex !== null && (
							<Button
								variant="destructive"
								onClick={() => {
									const updated = links.filter((_, i) => i !== editingIndex);
									setLinks(updated);
									setShowDialog(false);
									setEditingIndex(null);
								}}
							>
								Delete Shortcut
							</Button>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

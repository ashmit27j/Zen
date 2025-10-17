// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export function MusicPlayer() {
// 	return (
// 		<Card>
// 			<CardHeader className="pb-3">
// 				<CardTitle className="text-xl font-medium">Focus Music</CardTitle>
// 			</CardHeader>
// 			<CardContent>
// 				<div className="rounded-lg overflow-hidden w-full aspect-video">
// 					<iframe
// 						className="w-full h-full"
// 						src="https://www.youtube.com/embed/jfKfPfyJRdk"
// 						title="Lo-fi Chill Beats"
// 						frameBorder="0"
// 						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 						allowFullScreen
// 					></iframe>
// 				</div>
// 			</CardContent>
// 		</Card>
// 	);
// }

"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MusicPlayer() {
	const [videoUrl, setVideoUrl] = useState("");
	const [embedId, setEmbedId] = useState<string | null>(null);

	const extractYouTubeId = (url: string): string | null => {
		try {
			const parsedUrl = new URL(url.trim());
			if (parsedUrl.hostname.includes("youtube.com")) {
				return parsedUrl.searchParams.get("v");
			} else if (parsedUrl.hostname === "youtu.be") {
				return parsedUrl.pathname.substring(1);
			}
		} catch {
			return null;
		}
		return null;
	};

	const handleSubmit = () => {
		const id = extractYouTubeId(videoUrl);
		if (id) setEmbedId(id);
	};

	const handleReset = () => {
		setEmbedId(null);
		setVideoUrl("");
	};

	return (
		// history feature
		<Card className="bg-gradient-to-br from-zinc-50 via-zinc-95 to-zinc-160 dark:from-[#121212] dark:via-[#171717] dark:to-[#19191a]">
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between w-full">
					<CardTitle className="text-xl font-medium tracking-normal">
						Miniplayer
					</CardTitle>
					{embedId && (
						<Button
							variant="ghost"
							size="icon"
							className="h-6 w-6"
							onClick={handleReset}
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				{embedId ? (
					<div className="rounded-lg overflow-hidden w-full aspect-video">
						<iframe
							className="w-full h-full"
							src={`https://www.youtube.com/embed/${embedId}`}
							title="Embedded Video"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				) : (
					<div className="flex gap-[1rem]">
						<Input
							placeholder="Paste YouTube link"
							value={videoUrl}
							onChange={(e) => setVideoUrl(e.target.value)}
						/>
						<Button onClick={handleSubmit}>
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
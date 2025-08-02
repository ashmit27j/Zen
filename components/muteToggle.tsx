"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MuteToggle() {
	const [muted, setMuted] = useState(false);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setMuted((prev) => !prev)}
			aria-label="Toggle mute"
		>
			{muted ? (
				<VolumeX className="h-5 w-5" />
			) : (
				<Volume2 className="h-5 w-5" />
			)}
		</Button>
	);
}

// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"
// import { useTimer } from "@/context/timer-context"

// declare global {
//   interface Window {
//     YT: any
//     onYouTubeIframeAPIReady: () => void
//   }
// }

// export function MusicPlayer() {
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isMuted, setIsMuted] = useState(false)
//   const [volume, setVolume] = useState(70)
//   const { isActive } = useTimer()

//   const playerRef = useRef<any>(null)

//   // Load YouTube IFrame API
//   useEffect(() => {
//     const existingScript = document.getElementById("youtube-iframe-api")
//     if (!existingScript) {
//       const tag = document.createElement("script")
//       tag.src = "https://www.youtube.com/iframe_api"
//       tag.id = "youtube-iframe-api"
//       document.body.appendChild(tag)
//     }

//     window.onYouTubeIframeAPIReady = () => {
//       playerRef.current = new window.YT.Player("yt-player", {
//         height: "0",
//         width: "0",
//         videoId: "5qap5aO4i9A", // Lo-fi playlist stream
//         events: {
//           onReady: () => {
//             playerRef.current.setVolume(volume)
//           }
//         }
//       })
//     }
//   }, [])

//   // Handle timer-based autoplay
//   useEffect(() => {
//     if (isActive && playerRef.current && !isPlaying) {
//       playerRef.current.playVideo()
//       setIsPlaying(true)
//     }
//   }, [isActive, isPlaying])

//   // Control playback toggle
//   const togglePlayback = () => {
//     if (!playerRef.current) return
//     if (isPlaying) {
//       playerRef.current.pauseVideo()
//     } else {
//       playerRef.current.playVideo()
//     }
//     setIsPlaying(!isPlaying)
//   }

//   // Handle mute toggle
//   const toggleMute = () => {
//     if (!playerRef.current) return
//     if (isMuted) {
//       playerRef.current.unMute()
//     } else {
//       playerRef.current.mute()
//     }
//     setIsMuted(!isMuted)
//   }

//   // Handle volume change
//   const handleVolumeChange = (value: number[]) => {
//     const vol = value[0]
//     setVolume(vol)
//     if (playerRef.current) {
//       playerRef.current.setVolume(vol)
//       if (vol > 0) {
//         setIsMuted(false)
//         playerRef.current.unMute()
//       }
//     }
//   }

//   return (
//     <Card>
//       <CardHeader className="pb-3">
//         <CardTitle className="text-xl font-medium">Focus Music</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md h-24 mb-4 flex items-center justify-center">
//           <div className="text-center">
//             <div className="font-medium">Lo-Fi Focus Playlist</div>
//             <div className="text-sm text-zinc-500 dark:text-zinc-400">YouTube Music</div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               className={`rounded-full ${isPlaying ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
//               onClick={togglePlayback}
//             >
//               {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
//             </Button>

//             <Button variant="outline" size="icon" className="rounded-full">
//               <SkipForward className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="flex items-center gap-2 w-1/2">
//             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
//               {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
//             </Button>

//             <Slider
//               value={[isMuted ? 0 : volume]}
//               min={0}
//               max={100}
//               step={1}
//               onValueChange={handleVolumeChange}
//               className="w-full"
//             />
//           </div>
//         </div>

//         {/* Hidden YouTube player */}
//         <div id="yt-player" className="hidden" />
//       </CardContent>
//     </Card>
//   )
// }

//SECOND WORKING

"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useTimer } from "@/context/timer-context";

declare global {
	interface Window {
		YT: any;
		onYouTubeIframeAPIReady: () => void;
	}
}

export function MusicPlayer() {
	// const [isPlaying, setIsPlaying] = useState(false);
	// const [isMuted, setIsMuted] = useState(false);
	// const [volume, setVolume] = useState(70);
	// const { isActive } = useTimer();

	// const playerRef = useRef<any>(null);

	// // Load YouTube IFrame API
	// useEffect(() => {
	// 	const existingScript = document.getElementById("youtube-iframe-api");
	// 	if (!existingScript) {
	// 		const tag = document.createElement("script");
	// 		tag.src = "https://www.youtube.com/iframe_api";
	// 		tag.id = "youtube-iframe-api";
	// 		document.body.appendChild(tag);
	// 	}

	// 	window.onYouTubeIframeAPIReady = () => {
	// 		playerRef.current = new window.YT.Player("yt-player", {
	// 			height: "0",
	// 			width: "0",
	// 			videoId: "5qap5aO4i9A", // Lo-fi playlist stream
	// 			events: {
	// 				onReady: () => {
	// 					playerRef.current.setVolume(volume);
	// 				},
	// 			},
	// 		});
	// 	};
	// }, []);

	// // Handle timer-based autoplay
	// useEffect(() => {
	// 	if (isActive && playerRef.current && !isPlaying) {
	// 		playerRef.current.playVideo();
	// 		setIsPlaying(true);
	// 	}
	// }, [isActive, isPlaying]);

	// // Control playback toggle
	// const togglePlayback = () => {
	// 	if (!playerRef.current) return;
	// 	if (isPlaying) {
	// 		playerRef.current.pauseVideo();
	// 	} else {
	// 		playerRef.current.playVideo();
	// 	}
	// 	setIsPlaying(!isPlaying);
	// };

	// // Handle mute toggle
	// const toggleMute = () => {
	// 	if (!playerRef.current) return;
	// 	if (isMuted) {
	// 		playerRef.current.unMute();
	// 	} else {
	// 		playerRef.current.mute();
	// 	}
	// 	setIsMuted(!isMuted);
	// };

	// // Handle volume change
	// const handleVolumeChange = (value: number[]) => {
	// 	const vol = value[0];
	// 	setVolume(vol);
	// 	if (playerRef.current) {
	// 		playerRef.current.setVolume(vol);
	// 		if (vol > 0) {
	// 			setIsMuted(false);
	// 			playerRef.current.unMute();
	// 		}
	// 	}
	// };

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="text-xl font-medium">Focus Music</CardTitle>
			</CardHeader>
			<CardContent>
				<iframe
					style={{ borderRadius: "16px", background: "card" }}
					src="https://open.spotify.com/embed/playlist/0wE8iRxWBLAdR6gI4jGns6?utm_source=generator&theme=0"
					width="100%"
					height="352"
					frameBorder="0"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
					allowFullScreen
				></iframe>
			</CardContent>
		</Card>
	);
}

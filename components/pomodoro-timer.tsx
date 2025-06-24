"use client"

import { useState } from "react"
import { Play, Pause, RotateCcw, Maximize, Minimize, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTimer } from "@/context/timer-context"
import { MotivationalQuote } from "@/components/motivational-quote"

interface PomodoroTimerProps {
  isFullscreen: boolean
  setIsFullscreen: (value: boolean) => void
  showQuote: boolean
  setShowQuote: (value: boolean) => void
}

export function PomodoroTimer({ isFullscreen, setIsFullscreen, showQuote, setShowQuote }: PomodoroTimerProps) {
  const {
    timeLeft,
    isActive,
    timerMode,
    sessionsToday,
    totalSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimerMode,
  } = useTimer()

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  const circumference = 2 * Math.PI * 120
  const dashOffset =
    circumference * (1 - timeLeft / (timerMode === "focus" ? 25 * 60 : timerMode === "shortBreak" ? 5 * 60 : 15 * 60))

  const [isMuted, setIsMuted] = useState(false)

  return (
		<Card
			className={` bg-gradient-to-br from-zinc-50 via-zinc-95 to-zinc-160 dark:from-[#121212] dark:via-[#171717] dark:to-[#19191a] w-full max-w-md mx-auto ${
				isFullscreen ? "scale-125" : ""
			} transition-all duration-300`}
		>
			<CardContent className="pt-6">
				<div className="flex flex-col items-center">
					{!isFullscreen && (
						<Tabs
							defaultValue="focus"
							className="w-full mb-6"
							onValueChange={(value) =>
								setTimerMode(value as "focus" | "shortBreak" | "longBreak")
							}
						>
							<TabsList className="grid grid-cols-3">
								<TabsTrigger value="focus">Focus Time</TabsTrigger>
								<TabsTrigger value="shortBreak">Short Break</TabsTrigger>
								<TabsTrigger value="longBreak">Long Break</TabsTrigger>
							</TabsList>
						</Tabs>
					)}

					<div className="relative flex items-center justify-center my-4">
						<svg width="260" height="260" className="transform -rotate-90">
							<circle
								cx="130"
								cy="130"
								r="120"
								fill="none"
								stroke="currentColor"
								strokeWidth="4"
								className="text-zinc-200 dark:text-zinc-700"
							/>
							<circle
								cx="130"
								cy="130"
								r="120"
								fill="none"
								stroke="currentColor"
								strokeWidth="8"
								strokeLinecap="round"
								strokeDasharray={circumference}
								strokeDashoffset={dashOffset}
								className={`
                  ${
										timerMode === "focus"
											? "text-purple-500 dark:text-purple-400"
											: ""
									}
                  ${
										timerMode === "shortBreak"
											? "text-emerald-500 dark:text-emerald-400"
											: ""
									}
                  ${
										timerMode === "longBreak"
											? "text-blue-500 dark:text-blue-400"
											: ""
									}
                  transition-all duration-1000 ease-linear
                `}
							/>
						</svg>
						<div className="absolute flex flex-col items-center">
							<span className="text-5xl font-light">{formattedTime}</span>
							{!isFullscreen && (
								<span className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
									{timerMode === "focus"
										? "Focus Time"
										: timerMode === "shortBreak"
										? "Short Break"
										: "Long Break"}
								</span>
							)}
						</div>
					</div>

					{showQuote && !isFullscreen && <MotivationalQuote />}

					<div className="flex items-center justify-center gap-3 mt-4">
						<Button
							variant="outline"
							size="icon"
							onClick={resetTimer}
							aria-label="Reset timer"
						>
							<RotateCcw className="h-4 w-4" />
						</Button>

						<Button
							size="lg"
							className={`rounded-full w-12 h-12 ${
								timerMode === "focus"
									? "bg-purple-500 hover:bg-purple-600"
									: timerMode === "shortBreak"
									? "bg-emerald-500 hover:bg-emerald-600"
									: "bg-blue-500 hover:bg-blue-600"
							}`}
							onClick={isActive ? pauseTimer : startTimer}
							aria-label={isActive ? "Pause timer" : "Start timer"}
						>
							{isActive ? (
								<Pause className="h-5 w-5" />
							) : (
								<Play className="h-5 w-5 ml-0.5" />
							)}
						</Button>

						<Button
							variant="outline"
							size="icon"
							onClick={() => setIsFullscreen(!isFullscreen)}
							aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
						>
							{isFullscreen ? (
								<Minimize className="h-4 w-4" />
							) : (
								<Maximize className="h-4 w-4" />
							)}
						</Button>

						<Button
							variant="outline"
							size="icon"
							onClick={() => {
								setIsMuted(!isMuted);
								setShowQuote(!showQuote);
							}}
							aria-label={isMuted ? "Unmute" : "Mute"}
						>
							{isMuted ? (
								<VolumeX className="h-4 w-4" />
							) : (
								<Volume2 className="h-4 w-4" />
							)}
						</Button>
					</div>

					{!isFullscreen && (
						<div className="flex justify-between w-full mt-6 text-sm text-zinc-500 dark:text-zinc-400">
							<span>Sessions today: {sessionsToday}</span>
							<span>Total sessions: {totalSessions}</span>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

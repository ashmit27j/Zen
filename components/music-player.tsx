"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useTimer } from "@/context/timer-context"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(70)
  const { isActive } = useTimer()

  // Auto-play music when timer starts
  useEffect(() => {
    if (isActive && !isPlaying) {
      setIsPlaying(true)
    }
  }, [isActive, isPlaying])

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium">Focus Music</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md h-24 mb-4 flex items-center justify-center">
          <div className="text-center">
            <div className="font-medium">Lo-Fi Focus Playlist</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">YouTube Music</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${isPlaying ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>

            <Button variant="outline" size="icon" className="rounded-full">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-1/2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => {
                setVolume(value[0])
                if (value[0] > 0) setIsMuted(false)
              }}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

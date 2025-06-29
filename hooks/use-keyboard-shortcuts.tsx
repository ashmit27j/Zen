"use client"

import { useEffect } from "react"
import { useTimer } from "@/context/timer-context"
import { useTask } from "@/context/task-context"

export function useKeyboardShortcuts() {
  const { startTimer, pauseTimer, resetTimer, setTimerMode, isActive } = useTimer()
  const { addTask } = useTask()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.key.toLowerCase()) {
        case " ":
          event.preventDefault()
          if (isActive) {
            pauseTimer()
          } else {
            startTimer()
          }
          break
        case "r":
          event.preventDefault()
          resetTimer()
          break
        case "1":
          event.preventDefault()
          setTimerMode("focus")
          break
        case "2":
          event.preventDefault()
          setTimerMode("shortBreak")
          break
        case "3":
          event.preventDefault()
          setTimerMode("longBreak")
          break
        case "t":
          event.preventDefault()
          // Focus on the task input field
          const taskInput = document.querySelector('input[placeholder*="Add a new task"]') as HTMLInputElement
          if (taskInput) {
            taskInput.focus()
          }
          break
        case "m":
          event.preventDefault()
          // Toggle music (this would need to be implemented in the music player)
          console.log("Toggle music")
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [isActive, startTimer, pauseTimer, resetTimer, setTimerMode, addTask])
}

"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface TimerContextType {
  timeLeft: number
  isActive: boolean
  timerMode: "focus" | "shortBreak" | "longBreak"
  sessionsToday: number
  totalSessions: number
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  setTimerMode: (mode: "focus" | "shortBreak" | "longBreak") => void
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [timerMode, setTimerMode] = useState<"focus" | "shortBreak" | "longBreak">("focus")
  const [sessionsToday, setSessionsToday] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zen-sessions-today")
      return saved ? JSON.parse(saved) : 0
    }
    return 0
  })
  const [totalSessions, setTotalSessions] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zen-total-sessions")
      return saved ? JSON.parse(saved) : 0
    }
    return 0
  })

  // Check if it's a new day to reset sessionsToday
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastDate = localStorage.getItem("zen-last-date")
      const today = new Date().toDateString()

      if (lastDate !== today) {
        setSessionsToday(0)
        localStorage.setItem("zen-last-date", today)
      }
    }
  }, [])

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem("zen-sessions-today", JSON.stringify(sessionsToday))
    localStorage.setItem("zen-total-sessions", JSON.stringify(totalSessions))
  }, [sessionsToday, totalSessions])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)

      // If focus session completed, increment counters
      if (timerMode === "focus") {
        setSessionsToday((prev) => prev + 1)
        setTotalSessions((prev) => prev + 1)
      }

      // Play notification sound
      const audio = new Audio("/notification.mp3")
      audio.play()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, timerMode])

  // Update timer when mode changes
  useEffect(() => {
    if (timerMode === "focus") {
      setTimeLeft(25 * 60) // 25 minutes
    } else if (timerMode === "shortBreak") {
      setTimeLeft(5 * 60) // 5 minutes
    } else {
      setTimeLeft(15 * 60) // 15 minutes
    }
    setIsActive(false)
  }, [timerMode])

  const startTimer = () => {
    setIsActive(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    if (timerMode === "focus") {
      setTimeLeft(25 * 60)
    } else if (timerMode === "shortBreak") {
      setTimeLeft(5 * 60)
    } else {
      setTimeLeft(15 * 60)
    }
    setIsActive(false)
  }

  const changeTimerMode = (mode: "focus" | "shortBreak" | "longBreak") => {
    setTimerMode(mode)
  }

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isActive,
        timerMode,
        sessionsToday,
        totalSessions,
        startTimer,
        pauseTimer,
        resetTimer,
        setTimerMode: changeTimerMode,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  const context = useContext(TimerContext)
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider")
  }
  return context
}

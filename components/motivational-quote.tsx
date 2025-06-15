"use client"

import { useState, useEffect } from "react"

const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "It's not about having time, it's about making time. – Unknown",
  "Focus on being productive instead of busy. – Tim Ferriss",
  "You don't have to be great to start, but you have to start to be great. – Zig Ziglar",
  "The secret of getting ahead is getting started. – Mark Twain",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "Productivity is never an accident. It is always the result of a commitment to excellence. – Paul J. Meyer",
  "The way to get started is to quit talking and begin doing. – Walt Disney",
  "It always seems impossible until it's done. – Nelson Mandela",
  "You miss 100% of the shots you don't take. – Wayne Gretzky",
]

export function MotivationalQuote() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  return <div className="text-center my-4 px-4 py-2 italic text-zinc-600 dark:text-zinc-300">"{quote}"</div>
}

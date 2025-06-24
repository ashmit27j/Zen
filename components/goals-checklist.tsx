"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Plus, Trash2 } from "lucide-react"

interface Goal {
  id: string
  text: string
  completed: boolean
}

export function GoalsChecklist() {
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window !== "undefined") {
      const savedGoals = localStorage.getItem("zen-goals")
      return savedGoals ? JSON.parse(savedGoals) : []
    }
    return []
  })

  const [newGoal, setNewGoal] = useState("")

  useEffect(() => {
    localStorage.setItem("zen-goals", JSON.stringify(goals))
  }, [goals])

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now().toString(), text: newGoal, completed: false }])
      setNewGoal("")
    }
  }

  const toggleGoal = (id: string) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  return (
		<Card className="h-full bg-gradient-to-br from-zinc-50 via-zinc-95 to-zinc-160 dark:from-[#121212] dark:via-[#171717] dark:to-[#19191a]">
			<CardHeader className="pb-2">
				<CardTitle className="text-xl font-medium">Daily Goals</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex mb-3">
					<Input
						placeholder="Add a goal..."
						value={newGoal}
						onChange={(e) => setNewGoal(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") addGoal();
						}}
						className="mr-2"
					/>
					<Button onClick={addGoal} size="icon">
						<Plus className="h-4 w-4" />
					</Button>
				</div>

				<div className="space-y-2">
					{goals.map((goal) => (
						<div
							key={goal.id}
							className={`flex items-center p-2 rounded-md ${
								goal.completed ? "bg-zinc-50 dark:bg-zinc-800/50" : ""
							}`}
						>
							<Button
								variant="ghost"
								size="sm"
								className={`rounded-full p-0 w-5 h-5 mr-2 ${
									goal.completed
										? "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white"
										: "border border-zinc-300 dark:border-zinc-600"
								}`}
								onClick={() => toggleGoal(goal.id)}
							>
								{goal.completed && <Check className="h-3 w-3" />}
							</Button>

							<span
								className={`flex-grow text-sm ${
									goal.completed ? "line-through text-zinc-400" : ""
								}`}
							>
								{goal.text}
							</span>

							<Button
								variant="ghost"
								size="sm"
								onClick={() => deleteGoal(goal.id)}
								className="h-6 w-6 p-0 text-zinc-400 hover:text-red-500"
							>
								<Trash2 className="h-3 w-3" />
							</Button>
						</div>
					))}

					{goals.length === 0 && (
						<div className="text-center py-4 text-zinc-400 dark:text-zinc-500 text-sm">
							Add your goals for today
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define your Task type
export type Task = {
  id: string
  text: string
  completed: boolean
  tag: string
}

// Define the context type
type TaskContextType = {
  tasks: Task[]
  addTask: (task: Task) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  reorderTasks: (fromIndex: number, toIndex: number) => void
}

// Create the context with undefined as default
const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Export the provider component
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = window.localStorage.getItem("tasks")
    if (storedTasks !== null) {
      try {
        setTasks(JSON.parse(storedTasks))
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const reorderTasks = (fromIndex: number, toIndex: number) => {
    setTasks((prev) => {
      const updated = [...prev]
      const [removed] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, removed)
      return updated
    })
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, reorderTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

// Export the custom hook
export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}

"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface Task {
  id: string
  text: string
  completed: boolean
  tag?: string
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Task) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  reorderTasks: (fromIndex: number, toIndex: number) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("zen-tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem("zen-tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const reorderTasks = (fromIndex: number, toIndex: number) => {
    setTasks((prev) => {
      const newTasks = [...prev]
      const [removed] = newTasks.splice(fromIndex, 1)
      newTasks.splice(toIndex, 0, removed)
      return newTasks
    })
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
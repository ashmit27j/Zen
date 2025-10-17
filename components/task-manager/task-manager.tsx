// // "use client"

// // import type React from "react"

// // import { useState } from "react"
// // import { Check, Trash2, Plus, GripVertical, Tag } from "lucide-react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { useTask } from "@/context/task-context"
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// // export function TaskManager() {
// //   const { tasks, addTask, toggleTask, deleteTask, reorderTasks } = useTask()
// //   const [newTaskText, setNewTaskText] = useState("")
// //   const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null)

// //   const handleAddTask = () => {
// //     if (newTaskText.trim()) {
// //       addTask({
// //         id: Date.now().toString(),
// //         text: newTaskText,
// //         completed: false,
// //         tag: "Work",
// //       })
// //       setNewTaskText("")
// //     }
// //   }

// //   const handleDragStart = (index: number) => {
// //     setDraggedTaskIndex(index)
// //   }

// //   const handleDragOver = (e: React.DragEvent, index: number) => {
// //     e.preventDefault()
// //     if (draggedTaskIndex !== null && draggedTaskIndex !== index) {
// //       reorderTasks(draggedTaskIndex, index)
// //       setDraggedTaskIndex(index)
// //     }
// //   }

// //   return (
// //     <Card className="h-full">
// //       <CardHeader className="">
// //         <CardTitle className="text-xl font-medium flex justify-between items-center">
// //           Tasks
// //           <Badge variant="outline" className=" font-normal">
// //             {tasks.filter((t) => !t.completed).length} remaining
// //           </Badge>
// //         </CardTitle>
// //       </CardHeader>
// //       <CardContent className="">
// //         <div className="flex mb-4">
// //           <Input
// //             placeholder="Add a new task..."
// //             value={newTaskText}
// //             onChange={(e) => setNewTaskText(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === "Enter") handleAddTask()
// //             }}
// //             className="mr-2"
// //           />
// //           <Button onClick={handleAddTask} size="icon">
// //             <Plus className="h-4 w-4" />
// //           </Button>
// //         </div>

// //         <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
// //           {tasks.map((task, index) => (
// //             <div
// //               key={task.id}
// //               draggable
// //               onDragStart={() => handleDragStart(index)}
// //               onDragOver={(e) => handleDragOver(e, index)}
// //               className={`flex items-center p-3 rounded-md border ${
// //                 task.completed
// //                   ? "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
// //                   : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
// //               } transition-colors`}
// //             >
// //               <div className="cursor-grab mr-2 text-zinc-400">
// //                 <GripVertical className="h-4 w-4" />
// //               </div>

// //               <Button
// //                 variant="ghost"
// //                 size="sm"
// //                 className={`rounded-full p-0 w-5 h-5 mr-3 ${
// //                   task.completed
// //                     ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white"
// //                     : "border border-zinc-300 dark:border-zinc-600"
// //                 }`}
// //                 onClick={() => toggleTask(task.id)}
// //               >
// //                 {task.completed && <Check className="h-3 w-3" />}
// //               </Button>

// //               <span className={`flex-grow ${task.completed ? " text-zinc-400" : ""}`}>{task.text}</span>

// //               {/* <DropdownMenu>
// //                 <DropdownMenuTrigger asChild>
// //                   <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
// //                     <Tag className="h-4 w-4 text-zinc-500" />
// //                   </Button>
// //                 </DropdownMenuTrigger>
// //                 <DropdownMenuContent align="end">
// //                   <DropdownMenuItem>Work</DropdownMenuItem>
// //                   <DropdownMenuItem>Personal</DropdownMenuItem>
// //                   <DropdownMenuItem>Health</DropdownMenuItem>
// //                   <DropdownMenuItem>Learning</DropdownMenuItem>
// //                 </DropdownMenuContent>
// //               </DropdownMenu> */}

// //               <Button
// //                 variant="ghost"
// //                 size="sm"
// //                 onClick={() => deleteTask(task.id)}
// //                 className="ml-2 h-8 w-8 p-0 text-zinc-500 hover:text-red-500"
// //               >
// //                 <Trash2 className="h-4 w-4" />
// //               </Button>
// //             </div>
// //           ))}

// //           {tasks.length === 0 && (
// //             <div className="text-center py-8 text-zinc-400 dark:text-zinc-500">
// //               No tasks yet. Add one to get started!
// //             </div>
// //           )}
// //         </div>
// //       </CardContent>
// //     </Card>
// //   )
// // }

// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Check, Trash2, Plus, GripVertical, Tag } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { useTask } from "@/context/task-context"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// export function TaskManager() {
//   const { tasks, addTask, toggleTask, deleteTask, reorderTasks } = useTask()
//   const [newTaskText, setNewTaskText] = useState("")
//   const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null)

//   const handleAddTask = () => {
//     if (newTaskText.trim()) {
//       addTask({
//         id: Date.now().toString(),
//         text: newTaskText,
//         completed: false,
//         tag: "Work",
//       })
//       setNewTaskText("")
//     }
//   }

//   const handleDragStart = (index: number) => {
//     setDraggedTaskIndex(index)
//   }

//   const handleDragOver = (e: React.DragEvent, index: number) => {
//     e.preventDefault()
//     if (draggedTaskIndex !== null && draggedTaskIndex !== index) {
//       reorderTasks(draggedTaskIndex, index)
//       setDraggedTaskIndex(index)
//     }
//   }

//   return (
//     <Card className="h-full">
//       <CardHeader className="">
//         <CardTitle className="text-xl font-medium flex justify-between items-center pb-2">
//           Tasks
//           <Badge variant="outline" className=" font-normal text-">
//             {tasks.filter((t) => !t.completed).length} remaining
//           </Badge>
//         </CardTitle>
//         <div className="flex">
//           <Input
//             placeholder="Add a new task..."
//             value={newTaskText}
//             onChange={(e) => setNewTaskText(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleAddTask()
//             }}
//             className="mr-2"
//           />
//           <Button onClick={handleAddTask} size="icon" className="w-12">
//             <Plus className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent className="">
//         {/* <div className="flex mb-4">
//           <Input
//             placeholder="Add a new task..."
//             value={newTaskText}
//             onChange={(e) => setNewTaskText(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleAddTask()
//             }}
//             className="mr-2"
//           />
//           <Button onClick={handleAddTask} size="icon" className="w-12">
//             <Plus className="h-4 w-4" />
//           </Button>
//         </div> */}

//         {/* card container */}
//         <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
//           {tasks.map((task, index) => (
//             <div
//               key={task.id}
//               draggable
//               onDragStart={() => handleDragStart(index)}
//               onDragOver={(e) => handleDragOver(e, index)}
//               className={`flex items-center p-3 rounded-md border ${
//                 task.completed
//                   ? "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
//                   : "bg-white dark:bg-cta border-zinc-200 dark:border-zinc-700"
//               } transition-colors`}
//             >

//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className={`rounded-[0.3rem] p-0 w-5 h-5 mr-3 ${
//                   task.completed
//                     ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white"
//                     : "border border-zinc-300 dark:border-zinc-600"
//                 }`}
//                 onClick={() => toggleTask(task.id)}
//               >
//                 {task.completed && <Check className="h-3 w-3" />}
//               </Button>

//               <span className={`flex-grow ${task.completed ? " text-zinc-400" : ""}`}>{task.text}</span>

//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => deleteTask(task.id)}
//                 className="ml-2 h-8 w-8 p-0 text-zinc-500 hover:text-red-500"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           ))}

//           {tasks.length === 0 && (
//             <div className="text-center py-8 text-zinc-400 dark:text-zinc-500">
//               No tasks yet. Add one to get started!
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


// hhhh

"use client"

import type React from "react"
import { useState } from "react"
import { Check, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTask } from "@/context/task-context"

export function TaskManager() {
  const { tasks, addTask, toggleTask, deleteTask, reorderTasks } = useTask()
  const [newTaskText, setNewTaskText] = useState("")
  const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null)

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      addTask({
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
        tag: "Work",
      })
      setNewTaskText("")
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedTaskIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedTaskIndex !== null && draggedTaskIndex !== index) {
      reorderTasks(draggedTaskIndex, index)
      setDraggedTaskIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedTaskIndex(null)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-medium flex justify-between items-center pb-2">
          Tasks
          <Badge variant="outline" className="font-normal">
            {tasks.filter((t) => !t.completed).length} remaining
          </Badge>
        </CardTitle>
        <div className="flex">
          <Input
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask()
            }}
            className="mr-2"
          />
          <Button onClick={handleAddTask} size="icon" className="w-12">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center p-3 rounded-md border ${
                task.completed
                  ? "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
              } transition-colors cursor-grab active:cursor-grabbing`}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-[0.3rem] p-0 w-5 h-5 mr-3 ${
                  task.completed
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white"
                    : "border border-zinc-300 dark:border-zinc-600"
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed && <Check className="h-3 w-3" />}
              </Button>

              <span className={`flex-grow ${task.completed ? "line-through text-zinc-400" : ""}`}>
                {task.text}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="ml-2 h-8 w-8 p-0 text-zinc-500 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-8 text-zinc-400 dark:text-zinc-500">
              No tasks yet. Add one to get started!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
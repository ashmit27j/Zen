"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List } from "lucide-react"

export function Notes() {
  const [notes, setNotes] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("zen-notes") || ""
    }
    return ""
  })

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value
    setNotes(newNotes)
    if (typeof window !== "undefined") {
      localStorage.setItem("zen-notes", newNotes)
    }
  }

  const applyFormatting = (format: string) => {
    const textarea = document.getElementById("notes-textarea") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = notes.substring(start, end)

    let formattedText = ""
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `_${selectedText}_`
        break
      case "list":
        formattedText = `\n- ${selectedText}`
        break
      default:
        formattedText = selectedText
    }

    const newNotes = notes.substring(0, start) + formattedText + notes.substring(end)
    setNotes(newNotes)
    if (typeof window !== "undefined") {
      localStorage.setItem("zen-notes", newNotes)
    }

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  return (
		<Card className="h-full bg-gradient-to-br from-zinc-50 via-zinc-95 to-zinc-160 dark:from-[#121212] dark:via-[#171717] dark:to-[#19191a]">
			<CardHeader className="pb-2">
				<CardTitle className="text-xl font-medium">Notes</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-1 mb-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => applyFormatting("bold")}
					>
						<Bold className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => applyFormatting("italic")}
					>
						<Italic className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => applyFormatting("list")}
					>
						<List className="h-4 w-4" />
					</Button>
				</div>

				<textarea
					id="notes-textarea"
					value={notes}
					onChange={handleNotesChange}
					placeholder="Write your notes here..."
					className="w-full h-32 p-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
				/>
			</CardContent>
		</Card>
	);
}

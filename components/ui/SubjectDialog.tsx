// "use client";

// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";

// interface Props {
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// 	onAddSubject: (name: string) => void;
// }

// // interface Props {
// // 	onAddSubject: (name: string) => void;
// // }

// export const SubjectDialog = ({ onAddSubject }: Props) => {
// 	const [subjectName, setSubjectName] = useState("");

// 	return (
// 		<Dialog>
// 			<DialogTrigger>
// 				<Button variant="outline">+ Add Subject</Button>
// 			</DialogTrigger>
// 			<DialogContent>
// 				<DialogHeader>
// 					Add a new Subject
// 				</DialogHeader>
// 				<Input
// 					value={subjectName}
// 					onChange={(e) => setSubjectName(e.target.value)}
// 					placeholder="e.g. Math"
// 				/>
// 				<Button
// 					onClick={() => {
// 						if (subjectName.trim()) {
// 							onAddSubject(subjectName.trim());
// 							setSubjectName("");
// 						}
// 					}}
// 				>
// 					Add
// 				</Button>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Subject } from "@/types/subject";

interface SubjectDropdownProps {
  subjects: Subject[];
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
  setShowDialog: (val: boolean) => void;
}

export function SubjectDropdown({
  subjects,
  selectedSubjectId,
  setSelectedSubjectId,
  setShowDialog,
}: SubjectDropdownProps) {
  const selected = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {selected?.name || "Select Subject"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {subjects.map((s) => (
          <DropdownMenuItem key={s.id} onClick={() => setSelectedSubjectId(s.id)}>
            {s.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => setShowDialog(true)}
          className="text-primary font-semibold"
        >
          + Add new Subject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

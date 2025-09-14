// "use client";

// import {
//   Moon,
//   Sun,
//   Settings,
//   Volume2,
//   VolumeX,
//   LogIn,
// } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { useState } from "react";

// export function Header() {
//   const { theme, setTheme } = useTheme();
//   const [muted, setMuted] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);

//   const handleMuteToggle = () => setMuted((prev) => !prev);

//   return (
//     <>
//       <header className="border-b border-zinc-200 dark:border-zinc-800">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-light tracking-wide">
//             <span className="font-medium">Zen</span>
//           </h1>
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon" onClick={handleMuteToggle}>
//               {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setShowSettings(true)}
//               aria-label="Open settings"
//             >
//               <Settings className="h-5 w-5" />
//             </Button>
//             <Button
//               variant="outline"
//               className="text-xs px-3 py-1 hover:animate-pulse"
//               asChild
//             >
//               <a href="/login">
//                 <LogIn className="w-4 h-4 mr-1" /> Login
//               </a>
//             </Button>
//           </div>
//         </div>
//       </header>

//       <Dialog open={showSettings} onOpenChange={setShowSettings}>
//         <DialogContent className="max-w-4xl p-0 overflow-hidden">
//           <div className="flex h-[500px]">
//             <Tabs defaultValue="general" className="flex w-full">
//               <aside className="w-48 border-r bg-muted/40 px-2 py-4">
//                 <TabsList className="flex flex-col w-full items-start space-y-1">
//                   <TabsTrigger className="w-full text-left px-3 py-2 rounded-md data-[state=active]:bg-accent" value="general">General</TabsTrigger>
//                   <TabsTrigger className="w-full text-left px-3 py-2 rounded-md data-[state=active]:bg-accent" value="pomodoro">Pomodoro</TabsTrigger>
//                   <TabsTrigger className="w-full text-left px-3 py-2 rounded-md data-[state=active]:bg-accent" value="tasks">Tasks</TabsTrigger>
//                   <TabsTrigger className="w-full text-left px-3 py-2 rounded-md data-[state=active]:bg-accent" value="music">Music</TabsTrigger>
//                   <TabsTrigger className="w-full text-left px-3 py-2 rounded-md data-[state=active]:bg-accent" value="links">Quick Links</TabsTrigger>
//                 </TabsList>
//               </aside>
//               <div className="flex-1 p-6 overflow-y-auto">
//                 <TabsContent value="general" className="space-y-4">
//                   <h2 className="text-lg font-medium">General Settings</h2>
//                   <div className="flex items-center justify-between">
//                     <Label>Theme</Label>
//                     <Switch
//                       checked={theme === "dark"}
//                       onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
//                     />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <Label>Mute</Label>
//                     <Switch checked={muted} onCheckedChange={handleMuteToggle} />
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="pomodoro" className="space-y-4">
//                   <h2 className="text-lg font-medium">Pomodoro</h2>
//                   <div>
//                     <Label htmlFor="focus-time">Focus Time (minutes)</Label>
//                     <Input id="focus-time" type="number" placeholder="25" />
//                   </div>
//                   <div>
//                     <Label htmlFor="break-time">Break Time (minutes)</Label>
//                     <Input id="break-time" type="number" placeholder="5" />
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="tasks" className="space-y-4">
//                   <h2 className="text-lg font-medium">Tasks</h2>
//                   <Label htmlFor="default-category">Default Task Category</Label>
//                   <Input id="default-category" placeholder="General" />
//                 </TabsContent>

//                 <TabsContent value="music" className="space-y-4">
//                   <h2 className="text-lg font-medium">Music</h2>
//                   <Label htmlFor="youtube-link">Default YouTube Link</Label>
//                   <Input id="youtube-link" placeholder="https://youtube.com/..." />
//                 </TabsContent>

//                 <TabsContent value="links" className="space-y-4">
//                   <h2 className="text-lg font-medium">Quick Links</h2>
//                   <Label htmlFor="custom-link">Add Custom Site</Label>
//                   <Input id="custom-link" placeholder="https://example.com" />
//                 </TabsContent>
//               </div>
//             </Tabs>
//           </div>
//           <div className="flex justify-end gap-2 border-t p-4">
//             <Button variant="ghost" onClick={() => setShowSettings(false)}>
//               Cancel
//             </Button>
//             <Button onClick={() => setShowSettings(false)}>Save</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

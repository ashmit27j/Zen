import { useState, useRef } from "react";
import { Button } from "./button"; // Adjust the import path as needed
import { User } from "lucide-react";

export function ProfileDropdown(props: any) {
	const { user, auth } = props;
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	return (
		// <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
		// 	<Button
		// 		variant="ghost"
		// 		size="icon"
		// 		className="rounded-full overflow-hidden"
		// 		aria-label="Account"
		// 		onClick={() => setDropdownOpen((open) => !open)}
		// 		onMouseEnter={() => setDropdownOpen(true)}
		// 		id="profile-menu-trigger"
		// 	>
		// 		{user.photoURL ? (
		// 			<img
		// 				src={user.photoURL}
		// 				alt="Profile"
		// 				width={32}
		// 				height={32}
		// 				className="rounded-full"
		// 			/>
		// 		) : (
		// 			<User className="h-6 w-6" />
		// 		)}
		// 	</Button>

		// 	{dropdownOpen && (
		// 		<div
		// 			className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded shadow-lg z-50"
		// 			onMouseEnter={() => setDropdownOpen(true)}
		// 		>
		// 			<div className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200">
		// 				{user.displayName || user.email}
		// 			</div>
		// 			<hr className="my-1 border-zinc-200 dark:border-zinc-700" />
		// 			<a href="/profile">
		// 				<div className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm">
		// 					Profile
		// 				</div>
		// 			</a>
		// 			<button
		// 				className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm"
		// 				style={{ color: "tomato" }}
		// 				onClick={() => auth.signOut()}
		// 			>
		// 				Logout
		// 			</button>
		// 		</div>
		// 	)}
		// </div>
		<div className="relative" ref={dropdownRef}>
			<Button
				variant="ghost"
				size="icon"
				className="rounded-full overflow-hidden"
				aria-label="Account"
				// The button now ONLY toggles the state on click. No more hover events.
				onClick={() => setDropdownOpen((open) => !open)}
				id="profile-menu-trigger"
			>
				{user.photoURL ? (
					<img
						src={user.photoURL}
						alt="Profile"
						width={32}
						height={32}
						className="rounded-full"
					/>
				) : (
					<User className="h-6 w-6" />
				)}
			</Button>

			{dropdownOpen && (
				// This dropdown menu has no mouse events on it. It just exists.
				<div className=" w-fit absolute right-0 mt-2 bg-white dark:bg-zinc-800 rounded shadow-lg z-50">
					<div className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200">
						<span
							className="flex items-center gap-2 text-sm"
							style={{ width: "fit-content", maxWidth: "100%" }}
						>
							<span className="font-medium w-fit whitespace-nowrap">
								Logged in as:{" "}
							</span>
							<span className="font-medium">
								{user.displayName || user.email}
							</span>
						</span>
					</div>
					<hr className="my-1 border-zinc-200 dark:border-zinc-700" />
					<a
						href="/profile"
						className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm"
					>
						Profile
					</a>
					<button
						className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm"
						style={{ color: "tomato" }}
						onClick={() => {
							auth.signOut();
							setDropdownOpen(false); // Also close dropdown on logout
						}}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

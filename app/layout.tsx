import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
	title: "Zen",
	description: "Zen productivity App",
	generator: "v0.dev",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				{children}
				<Toaster
					position="top-right"
					toastOptions={{
						className: "rounded-lg shadow-md",
						style: {
							background: "var(--toast-bg)",
							color: "var(--toast-text)",
						},
					}}
				/>
			</body>
		</html>
	);
}


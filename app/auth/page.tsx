"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { Github, Mail, Lock, KeyRound } from "lucide-react";

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleAuth = async () => {
		setLoading(true);
		setError("");
		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, email, password);
			} else {
				await createUserWithEmailAndPassword(auth, email, password);
			}
			router.push("/"); // ✅ Redirect to dashboard
		} catch (err: any) {
			const errorMap: Record<string, string> = {
				"auth/user-not-found": "No account found with this email.",
				"auth/wrong-password": "Incorrect password. Try again.",
				"auth/email-already-in-use": "This email is already registered.",
				"auth/invalid-email": "Invalid email address.",
				"auth/weak-password": "Password should be at least 6 characters.",
			};
			setError(errorMap[err.code] || "Something went wrong. Try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleForgotPassword = async () => {
		if (!email) {
			setError("Please enter your email first.");
			return;
		}
		try {
			await sendPasswordResetEmail(auth, email);
			setError("Password reset email sent!");
		} catch (err: any) {
			setError("Failed to send reset email. Check your email address.");
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			router.push("../layout");
		} catch {
			setError("Google login failed.");
		}
	};

	

	return (
		<div className="flex min-h-screen">
			{/* Left Section */}
			<div className="hidden md:flex flex-col justify-between w-1/2 bg-muted p-10 dark:bg-zinc-900">
				<h1 className="text-lg font-semibold flex items-center gap-2">
					⌘ Zen Inc
				</h1>
				<blockquote className="text-sm text-muted-foreground">
					“This app has saved me countless hours and helped me stay productive.”
				</blockquote>
			</div>

			{/* Right Section */}
			<div className="flex w-full md:w-1/2 items-center justify-center p-8 relative">
				{/* Toggle Button */}
				<Button
					variant="link"
					className="absolute top-6 right-6 text-sm"
					onClick={() => setIsLogin(!isLogin)}
				>
					{isLogin ? "Sign Up" : "Login"}
				</Button>

				<div className="w-full max-w-sm space-y-6">
					<h2 className="text-2xl font-semibold text-center">
						{isLogin ? "Welcome back" : "Create an account"}
					</h2>
					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<div className="space-y-4">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="name@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button
							className="w-full bg-black text-white dark:bg-white dark:text-black"
							onClick={handleAuth}
							disabled={loading}
						>
							{loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
						</Button>
						{isLogin && (
							<button
								onClick={handleForgotPassword}
								className="text-muted-foreground text-sm"
							>
								Forgot Password?
							</button>
						)}
					</div>

					<div className="flex items-center">
						<div className="flex-1 border-t" />
						<span className="px-2 text-xs text-muted-foreground">OR</span>
						<div className="flex-1 border-t" />
					</div>

					<div className="space-y-2">
						<Button
							variant="outline"
							className="w-full flex items-center gap-2"
						>
							<Github className="w-4 h-4" /> Continue with GitHub
						</Button>
						<Button
							variant="outline"
							className="w-full flex items-center gap-2"
							onClick={handleGoogleLogin}
						>
							<Mail className="w-4 h-4" /> Continue with Google
						</Button>
						<div id="recaptcha-container"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

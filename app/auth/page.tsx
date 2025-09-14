"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { Github, Mail } from "lucide-react";

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const router = useRouter();

	const clearErrors = () => {
		setEmailError("");
		setPasswordError("");
	};

	const handleAuth = async () => {
		setLoading(true);
		clearErrors();

		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, email, password);
				const username = email.split("@")[0];
				toast.success(`Welcome Back! ${username}`);
			} else {
				await createUserWithEmailAndPassword(auth, email, password);
				toast.success("Account created successfully!");
			}
			router.push("/");
		} catch (err: any) {
			const errorMap: Record<string, () => void> = {
				"auth/user-not-found": () =>
					setEmailError("No account found with this email."),
				"auth/wrong-password": () => setPasswordError("Incorrect password."),
				"auth/email-already-in-use": () =>
					setEmailError("This email is already registered."),
				"auth/invalid-email": () => setEmailError("Invalid email address."),
				"auth/weak-password": () =>
					setPasswordError("Password should be at least 6 characters."),
			};
			if (errorMap[err.code]) {
				errorMap[err.code]();
			} else {
				setEmailError("Something went wrong. Try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleForgotPassword = async () => {
		clearErrors();

		if (!email) {
			setEmailError("Please enter your email first.");
			return;
		}

		try {
			await sendPasswordResetEmail(auth, email, {
				url: `${window.location.origin}/auth/reset-password`,
				handleCodeInApp: true,
			});
			toast.success("Password reset email sent!");
		} catch (err: any) {
			if (err.code === "auth/invalid-email") {
				setEmailError("Invalid email address.");
			} else if (err.code === "auth/user-not-found") {
				setEmailError("No account found with this email.");
			} else {
				setEmailError("Failed to send reset email.");
			}
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			router.push("/");
		} catch {
			setEmailError("Google login failed.");
		}
	};

	return (
		<div className="flex min-h-screen bg-zinc-950 text-zinc-100">
			{/* Left Section */}
			<div className="hidden md:flex flex-col justify-between w-1/2 bg-zinc-900 p-10">
				<h1 className="text-lg font-semibold flex items-center gap-2 text-zinc-100">
					⌘ Zen Inc
				</h1>
				<blockquote className="text-sm text-zinc-400">
					“This app has saved me countless hours and helped me stay productive.”
				</blockquote>
			</div>

			{/* Right Section */}
			<div className="flex w-full md:w-1/2 items-center justify-center p-8 relative">
				{/* Toggle Button */}
				<Button
					variant="link"
					className="absolute top-6 right-6 font-semibbold text-zinc-100"
					onClick={() => {
						clearErrors();
						setIsLogin(!isLogin);
					}}
				>
					{isLogin ? "Sign Up" : "Login"}
				</Button>

				<div className="w-full max-w-sm space-y-6">
					<h2 className="text-2xl font-semibold text-center text-zinc-100">
						{isLogin ? "Welcome back" : "Create an account"}
					</h2>

					{/* Email Field */}
					<div>
						<Label htmlFor="email" className="text-zinc-300">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`bg-zinc-900 text-zinc-100 border-zinc-700 ${
								emailError ? "border-red-500 focus:ring-red-500" : ""
							}`}
						/>
						{emailError && (
							<p className="text-red-500 text-xs mt-1">{emailError}</p>
						)}
					</div>

					{/* Password Field */}
					<div>
						<Label htmlFor="password" className="text-zinc-300">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`bg-zinc-900 text-zinc-100 border-zinc-700 ${
								passwordError ? "border-red-500 focus:ring-red-500" : ""
							}`}
						/>
						{passwordError && (
							<p className="text-red-500 text-xs mt-1">{passwordError}</p>
						)}
					</div>

					<Button
						className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
						onClick={handleAuth}
						disabled={loading}
					>
						{loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
					</Button>

					{isLogin && (
						<button
							onClick={handleForgotPassword}
							className="text-zinc-400 text-sm"
						>
							Forgot Password?
						</button>
					)}

					<div className="flex items-center">
						<div className="flex-1 border-t border-zinc-700" />
						<span className="px-2 text-xs text-zinc-400">OR</span>
						<div className="flex-1 border-t border-zinc-700" />
					</div>

					<div className="space-y-2">
						<Button
							variant="outline"
							className="w-full flex items-center gap-2 border-zinc-700 text-zinc-100 bg-zinc-900 hover:bg-zinc-800"
						>
							<Github className="w-4 h-4" /> Continue with GitHub
						</Button>
						<Button
							variant="outline"
							className="w-full flex items-center gap-2 border-zinc-700 text-zinc-100 bg-zinc-900 hover:bg-zinc-800"
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

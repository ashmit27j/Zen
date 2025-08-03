"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const oobCode = searchParams.get("oobCode");
	const router = useRouter();

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [passwordError, setPasswordError] = useState("");
	const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null);

	const clearErrors = () => setPasswordError("");

	// ✅ Check if link is valid
	useEffect(() => {
		const verifyLink = async () => {
			if (!oobCode) return setIsLinkValid(false);
			try {
				await verifyPasswordResetCode(auth, oobCode);
				setIsLinkValid(true);
			} catch {
				setIsLinkValid(false);
			}
		};
		verifyLink();
	}, [oobCode]);

	const handleReset = async () => {
		clearErrors();

		if (newPassword.length < 6) {
			setPasswordError("Password should be at least 6 characters.");
			return;
		}
		if (newPassword !== confirmPassword) {
			setPasswordError("Passwords do not match.");
			return;
		}

		try {
			setLoading(true);
			await confirmPasswordReset(auth, oobCode!, newPassword);
			toast.success("Password reset successful!");
			router.push("/auth");
		} catch {
			setPasswordError("Failed to reset password. Try again.");
		} finally {
			setLoading(false);
		}
	};

	if (isLinkValid === false) {
		return (
			<div className="flex min-h-screen items-center justify-center p-6">
				<div className="bg-white dark:bg-zinc-900 p-6 rounded shadow w-full max-w-md text-center">
					<h2 className="text-2xl font-bold mb-4 text-red-500">
						Invalid or Expired Link
					</h2>
					<p className="text-muted-foreground mb-6">
						This password reset link is no longer valid. Please request a new
						one.
					</p>
					<Button className="w-full" onClick={() => router.push("/auth")}>
						Back to Login
					</Button>
				</div>
			</div>
		);
	}

	if (isLinkValid === null) {
		return (
			<div className="flex min-h-screen items-center justify-center text-lg font-semibold">
				Checking link validity...
			</div>
		);
	}

	return (
		<div className="flex min-h-screen">
			{/* Left Section (Branding) */}
			<div className="hidden md:flex flex-col justify-between w-1/2 bg-muted p-10 dark:bg-zinc-900">
				<h1 className="text-lg font-semibold flex items-center gap-2">
					⌘ Zen Inc
				</h1>
				<blockquote className="text-sm text-muted-foreground">
					“Stay secure and productive with Zen.”
				</blockquote>
			</div>

			{/* Right Section (Form) */}
			<div className="flex w-full md:w-1/2 items-center justify-center p-8">
				<div className="w-full max-w-sm space-y-6">
					<h2 className="text-2xl font-semibold text-center">Reset Password</h2>

					<div>
						<Label htmlFor="newPassword">New Password</Label>
						<Input
							id="newPassword"
							type="password"
							placeholder="••••••••"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className={
								passwordError ? "border-red-500 focus:ring-red-500" : ""
							}
						/>
					</div>

					<div>
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="••••••••"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={
								passwordError ? "border-red-500 focus:ring-red-500" : ""
							}
						/>
						{passwordError && (
							<p className="text-red-500 text-xs mt-1">{passwordError}</p>
						)}
					</div>

					<Button
						className="w-full bg-black text-white dark:bg-white dark:text-black"
						onClick={handleReset}
						disabled={loading}
					>
						{loading ? "Please wait..." : "Reset Password"}
					</Button>
				</div>
			</div>
		</div>
	);
}

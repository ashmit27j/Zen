"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<Card className="w-full max-w-md shadow-md">
				<CardHeader>
					<CardTitle className="text-center text-2xl">Login</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="name@example.com" />
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" placeholder="••••••••" />
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<Button className="w-full">Login</Button>
					<p className="text-sm text-center">
						Don’t have an account?{" "}
						<Link href="/signup" className="text-primary underline">
							Sign Up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}

import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";

function RegisterPage() {
	const [name, setName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	function register() {
		console.log("Registering with", { name, lastName, email, password });
	}
	return (
		<Background>
			<div className="min-h-screen flex justify-center items-center">
				<Card className="w-full max-w-sm z-10">
					<CardHeader>
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
						<CardAction>
							<Link to="/login">
								<Button variant="link">Login</Button>
							</Link>
						</CardAction>
					</CardHeader>
					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
								<div className="flex gap-5">
									<div className="grid gap-2">
										<Label htmlFor="name">Name</Label>
										<Input
											type="text"
											placeholder="John"
											required
											onChange={(event) => setName(event.target.value)}
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="lastname">Lastname</Label>
										<Input
											type="text"
											placeholder="Doe"
											required
											onChange={(event) => setLastName(event.target.value)}
										/>
									</div>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										type="email"
										placeholder="m@example.com"
										required
										onChange={(event) => setEmail(event.target.value)}
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
									</div>
									<Input
										type="password"
										required
										onChange={(event) => setPassword(event.target.value)}
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button type="submit" className="w-full" onClick={register}>
							Register
						</Button>
					</CardFooter>
				</Card>
			</div>
		</Background>
	);
}

export default RegisterPage;

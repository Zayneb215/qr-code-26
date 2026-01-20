import { Label } from "@radix-ui/react-label";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";
import Background from "@/components/Background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/constants/api";

function RegisterPage() {
	const [name, setName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>();

	function clearAll() {
		setName("");
		setLastName("");
		setEmail("");
		setPassword("");
	}

	async function register() {
		const data = {
			email: email,
			password: password,
			name: name,
			last_name: lastName,
		};
		try {
			const resonse = await axios.post(`${API_BASE_URL}/auth/register`, data);
			if (resonse.status === 201)
				setSuccessMessage("User registered successfully");
			setTimeout(() => {
				setSuccessMessage(null);
			}, 1000);
			clearAll();
		} catch (error: any) {
			setErrorMessage(error.response.data.message || "Registration failed");
			setTimeout(() => {
				setErrorMessage(null);
			}, 1000);
		}
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
											value={name}
											onChange={(event) => setName(event.target.value)}
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="lastname">Lastname</Label>
										<Input
											type="text"
											placeholder="Doe"
											required
											value={lastName}
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
										value={email}
										onChange={(event) => setEmail(event.target.value)}
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
									</div>
									<Input
										value={password}
										type="password"
										required
										onChange={(event) => setPassword(event.target.value)}
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button type="button" className="w-full" onClick={register}>
							Register
						</Button>
						{successMessage && (
							<Badge variant="secondary">successMessage</Badge>
						)}
						{errorMessage && (
							<Badge variant="destructive">{errorMessage}</Badge>
						)}
					</CardFooter>
				</Card>
			</div>
		</Background>
	);
}

export default RegisterPage;

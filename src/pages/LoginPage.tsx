import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import Background from "@/components/Background";
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
import { Link } from "@tanstack/react-router";

function LoginPage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const login = () => {
		console.log("Logging in with", { email, password });
	};
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
							<Link to="/register">
								<Button variant="link">Register</Button>
							</Link>
						</CardAction>
					</CardHeader>
					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
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
						<Button type="submit" className="w-full" onClick={login}>
							Login
						</Button>
					</CardFooter>
				</Card>
			</div>
		</Background>
	);
}

export default LoginPage;

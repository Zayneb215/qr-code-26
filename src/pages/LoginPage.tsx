import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import useAuth, { type LoginData } from "@/hooks/use-auth";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const { login, isAuthenticated } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: "/" });
		}
	}, [isAuthenticated, navigate]);

	async function handleLogin() {
		try {
			const loginData: LoginData = {
				username: email,
				password: password,
			};
			await login(loginData);
			navigate({ to: "/" });
		} catch (err: any) {
			setError(err.response?.data?.message || "Login failed");
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
							<Link to="/register">
								<Button variant="link">Register</Button>
							</Link>
						</CardAction>
					</CardHeader>

					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label>Email</Label>
									<Input
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className="grid gap-2">
									<Label>Password</Label>
									<Input
										type="password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>
						</form>
					</CardContent>

					<CardFooter className="flex-col gap-2">
						<Button type="submit" className="w-full" onClick={handleLogin}>
							Login
						</Button>
						{error && <Badge variant={"destructive"}>{error}</Badge>}
					</CardFooter>
				</Card>
			</div>
		</Background>
	);
}

export default LoginPage;

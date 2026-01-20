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

interface LoginResponse {
	access_token: string;
}
function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	async function login() {
		try {
			const data = new URLSearchParams();
			data.append("username", email);
			data.append("password", password);
			const response = await axios.post<LoginResponse>(
				`${API_BASE_URL}/auth/jwt/login`,
				data,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			);

			localStorage.setItem("token", response.data.access_token);
			console.log("LOGIN OK ✅", response.data);
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
						<Button type="submit" className="w-full">
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

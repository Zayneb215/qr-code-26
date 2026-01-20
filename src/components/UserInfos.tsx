import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import useAuth, { type User } from "@/hooks/use-auth";
import { Button } from "./ui/button";

function UserInfos() {
	const { me } = useAuth();
	const [user, setUser] = useState<User | null>(null);

	const { logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		await logout();
		navigate({ to: "/login" });
	}

	// biome-ignore lint: ignore
	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await me();
				setUser(response.data);
			} catch (error) {
				localStorage.removeItem("token");
				navigate({ to: "/login" });
			}
		}
		fetchUser();
	}, []);

	if (!user) return null;

	return (
		<div className="container flex flex-col gap-5 bg-primary/10 p-5 rounded-2xl">
			<h1 className="text-5xl">
				Welcome,
				<p className="font-bold">
					{user.name} {user.last_name}!
				</p>
			</h1>
			<div className="flex flex-col gap-1 text-xl">
				<p>
					<strong>UUID:</strong> {user.id}
				</p>
				<p>
					<strong>Name:</strong> {user.name}
				</p>
				<p>
					<strong>Lastname:</strong> {user.last_name}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
			</div>
			<span className="ml-auto">
				<Button className="w-auto" onClick={handleLogout}>
					Logout
				</Button>
			</span>
		</div>
	);
}

export default UserInfos;

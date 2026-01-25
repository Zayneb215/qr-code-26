import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import HomePageBg from "@/components/HomePageBg";
import NavBar from "@/components/NavBar";
import useAuth from "@/hooks/use-auth";

function ProtectedLayout() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		async function checkAuth() {
			const authenticated = await isAuthenticated();
			if (!authenticated) {
				navigate({ to: "/login" });
			}
		}
		checkAuth();
	}, [isAuthenticated, navigate]);

	return (
		<HomePageBg>
			<div className="container mx-auto flex flex-col gap-5 z-20">
				<NavBar />
				<Outlet />
			</div>
		</HomePageBg>
	);
}

export default ProtectedLayout;

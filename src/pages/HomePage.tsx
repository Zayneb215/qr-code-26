import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";

function HomePage() {
	const { login } = useAuth();

	return (
		<div className="min-h-screen flex justify-center items-center">
			<Link to="/login">
				<Button variant="secondary" className="cursor-pointer mx-2">
					Go Login
				</Button>
			</Link>

			<Link to="/register">
				<Button className="cursor-pointer mx-2"> Go Register </Button>
			</Link>
		</div>
	);
}

export default HomePage;

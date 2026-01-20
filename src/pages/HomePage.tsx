import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";

function HomePage() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	if (!isAuthenticated) {
		navigate({ to: "/login" });
	}
	return (
		<div className="min-h-screen container mx-auto flex flex-col gap-5 z-20">
			<div className="flex flex-col justify-center gap-3 text-center mx-auto w-full h-80">
				<h1 className="text-6xl font-bold">QR Code Generator</h1>
				<p>Generate your QR codes easily and quickly.</p>
				<Link to="/generate">
					<Button>Generate</Button>
				</Link>
			</div>
		</div>
	);
}

export default HomePage;

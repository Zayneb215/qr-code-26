import { Link } from "@tanstack/react-router";
import logo from "/logo.png";
import { Button } from "./ui/button";

function NavBar() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
		{ to: "/users", label: "Users" },
		{ to: "/adduser", label: "Add User" },
	];

	return (
		<nav
			className="
        container mx-auto
        sticky top-4 z-50
        flex justify-between items-center
        p-4 px-10 mb-10 rounded-2xl

        bg-primary/30
        border border-white/10
        shadow-lg shadow-black/10
      "
		>
			<Link to="/">
				<img alt="logo" src={logo} className="w-10 h-10" />
			</Link>

			<div className="flex gap-2">
				{links.map((link) => (
					<Link
						key={link.to}
						className="
              text-black text-md
              hover:bg-white/15 hover:text-white
              p-2 px-4 rounded-full
              transition-all duration-300
            "
						to={link.to}
					>
						{link.label}
					</Link>
				))}
			</div>

			<Link to="/generate">
				<Button>Generate</Button>
			</Link>
		</nav>
	);
}

export default NavBar;

import { Link } from "@tanstack/react-router";
import logo from "/logo.png";

function NavBar() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
		{ to: "/users", label: "Users" },
		{ to: "/adduser", label: "Add User" },
		{ to: "/generate", label: "Generate" },
	];
	return (
		<nav className="container bg-primary/90 mx-auto flex p-4 px-10 rounded-2xl mb-10">
			<Link to="/">
				<img alt="logo" src={logo} className="w-10 h-10" />
			</Link>
			<div className="ml-auto flex gap-2">
				{links.map((link) => (
					<Link
						key={link.to}
						className="text-white text-xl hover:bg-white/20 hover:text-white p-2 rounded-full transition-all duration-300 "
						to={link.to}
					>
						{link.label}
					</Link>
				))}
			</div>
		</nav>
	);
}

export default NavBar;

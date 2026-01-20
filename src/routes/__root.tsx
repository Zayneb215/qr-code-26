import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import HomePageBg from "@/components/HomePageBg";
import NavBar from "@/components/NavBar";

export const Route = createRootRoute({
	component: () => (
		<>
			<HomePageBg>
				<NavBar />
				<Outlet />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			</HomePageBg>
		</>
	),
});

import { createFileRoute } from "@tanstack/react-router";
import AddUserPage from "@/pages/AddUserPage";

export const Route = createFileRoute("/_protected/adduser")({
	component: AddUserPage,
});

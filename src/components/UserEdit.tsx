"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { User } from "@/hooks/use-users";
import UserForm from "./UserForm";

export const title = "OTP Code";
interface UserEditProps {
	user: User;
}
const UserEdit = (props: UserEditProps) => {
	const { user } = props;
	const [dialogOpen, setDialogOpen] = useState(false);
	function openDialog() {
		setDialogOpen(true);
	}
	function closeDialog() {
		setDialogOpen(false);
	}
	return (
		<Dialog open={dialogOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto" onClick={openDialog}>
					Edit User
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
					<DialogDescription>
						Make changes to user information here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<UserForm user={user} onSubmit={closeDialog} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UserEdit;

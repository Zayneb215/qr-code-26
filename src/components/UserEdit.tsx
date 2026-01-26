"use client";

import { Label } from "@radix-ui/react-label";
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
import { Input } from "./ui/input";

export const title = "OTP Code";

const UserEdit = () => {
	const [value, setValue] = useState("");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Edit User</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Verify your email</DialogTitle>
					<DialogDescription>
						We've sent a 6-digit code to your email address. Please enter it
						below.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Label>Name</Label>
					<Input></Input>
					<Label>Email</Label>
					<Input></Input>
				</div>
				<DialogFooter>
					<Button disabled={value.length !== 6} type="button">
						Verify
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UserEdit;

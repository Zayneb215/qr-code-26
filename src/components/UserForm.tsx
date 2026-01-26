import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { User, UserIn } from "@/hooks/use-users";
import useUsers from "@/hooks/use-users";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface UserFormProps {
	user: UserIn | User;
	onSubmit: () => void;
	createUser?: boolean;
}
function UserForm(props: UserFormProps) {
	const { user, onSubmit, createUser = false } = props;
	const [userInput, setUserInput] = useState<User | UserIn>({
		...user,
		married: user.married ?? false,
	});
	const { updateUser, createUser: createUserFunction } = useUsers();
	const [error, setError] = useState<string | null>(null);

	async function handleSave() {
		// Implement save logic here, e.g., send updated userInput to the server
		console.log("Saved user data:", userInput);
		try {
			if (createUser) {
				await createUserFunction(userInput as UserIn);
			} else {
				await updateUser(userInput as User);
			}

			onSubmit();
		} catch (error) {
			setError("Failed to update user data.");
			console.error(error);
		}
	}
	return (
		<div className="flex flex-col gap-4 p-4">
			<div className="flex flex-col gap-2">
				<Label htmlFor="name">Name</Label>
				<Input
					value={userInput.name}
					onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
					id="name"
					placeholder="Enter name"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="matriculation-number">Matriculation Number</Label>
				<Input
					value={userInput.matriculation_number}
					id="matriculation-number"
					placeholder="Enter matriculation number"
					onChange={(e) =>
						setUserInput({ ...userInput, matriculation_number: e.target.value })
					}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="phone">Phone Number</Label>
				<Input
					value={userInput.phone_number ?? ""}
					id="phone"
					placeholder="Enter phone number"
					type="tel"
					onChange={(e) =>
						setUserInput({ ...userInput, phone_number: e.target.value })
					}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="age">Age</Label>
				<Input
					value={userInput.age ?? ""}
					id="age"
					placeholder="Enter age"
					type="number"
					onChange={(e) =>
						setUserInput({ ...userInput, age: Number(e.target.value) })
					}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					value={userInput.email}
					id="email"
					placeholder="Enter email address"
					type="email"
					onChange={(e) =>
						setUserInput({ ...userInput, email: e.target.value })
					}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="married">Married</Label>
				<Select
					defaultValue={userInput.married ? "yes" : "no"}
					onValueChange={(value) =>
						setUserInput({ ...userInput, married: value === "yes" })
					}
				>
					<SelectTrigger className="w-full max-w-48">
						<SelectValue placeholder="Select option" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Married</SelectLabel>
							<SelectItem value="yes">Yes</SelectItem>
							<SelectItem value="no">No</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<Button type="button" onClick={handleSave}>
				Save
			</Button>
			{error && <Badge variant={"destructive"}>{error}</Badge>}
		</div>
	);
}

export default UserForm;

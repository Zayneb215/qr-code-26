import type { User } from "@/hooks/use-users";
import UserEdit from "./UserEdit";
import { Button } from "./ui/button";

interface UserItemProps {
	user: User;
}

function UserItem(props: UserItemProps) {
	const { user } = props;
	return (
		<div key={user.id} className="flex flex-col gap-2 p-2">
			<div className="flex gap-20">
				<div className="flex flex-col gap-2">
					<p className="text-muted-foreground">
						<strong>Name</strong> : {user.name}
					</p>
					<p className="text-muted-foreground">
						<strong>Married</strong> : {user.married ? "Yes" : "No"}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-muted-foreground">
						<strong>Email</strong> : {user.email}
					</p>
					<p className="text-muted-foreground">
						<strong>Matriculation Number</strong> : {user.matriculation_number}
					</p>
				</div>
			</div>
			<p className="text-muted-foreground">
				<strong>Phone Number</strong> : {user.phone_number}
			</p>
			<UserEdit />
		</div>
	);
}

export default UserItem;

import type { User } from "@/hooks/use-users";

interface UserItemProps {
	user: User;
}
function UserItem(props: UserItemProps) {
	const { user } = props;
	return (
		<div key={user.id} className="bg-primary text-white p-3 rounded-md">
			<h1>{user.email}</h1>
			<h1>{user.name}</h1>
		</div>
	);
}

export default UserItem;

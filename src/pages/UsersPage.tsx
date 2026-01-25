import { useEffect, useState } from "react";
import UserItem from "@/components/UserItem";
import useUsers, { type User } from "../hooks/use-users";

function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const { fetchUsers } = useUsers();
	async function loadUsers() {
		const loadedUsers = await fetchUsers();
		setUsers(loadedUsers);
	}
	useEffect(() => {
		loadUsers();
	}, []);
	if (users.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className="flex gap-5">
				{users.map((user) => (
					<UserItem user={user} key={user.id} />
				))}
			</div>
		</div>
	);
}

export default UsersPage;

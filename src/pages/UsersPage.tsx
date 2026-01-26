import { useEffect, useState } from "react";
import UserList from "@/components/UserList";
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
			<h1 className="text-5xl font-bold mb-4">Manage Users</h1>
			<UserList users={users} />
		</div>
	);
}

export default UsersPage;

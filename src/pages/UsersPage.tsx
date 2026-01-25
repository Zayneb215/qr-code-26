import UserItem from "@/components/UserItem";

function UsersPage() {
	const users = [];

	return (
		<>
			{users.map((user) => (
				<UserItem key={user.id} />
			))}
		</>
	);
}

export default UsersPage;

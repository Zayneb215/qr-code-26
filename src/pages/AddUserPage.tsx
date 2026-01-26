import UserForm from "@/components/UserForm";
import type { UserIn } from "@/hooks/use-users";

function AddUserPage() {
	const user: UserIn = {
		name: "",
		email: "",
		age: null,
		married: null,
		phone_number: null,
		matriculation_number: "",
	};
	return (
		<div>
			<h1 className="text-5xl font-bold">Add User</h1>
			<div className="bg-white rounded-xl">
				<UserForm createUser={true} user={user} onSubmit={() => {}} />
			</div>
		</div>
	);
}

export default AddUserPage;

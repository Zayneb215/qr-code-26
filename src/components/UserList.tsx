import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { User } from "@/hooks/use-users";
import UserItem from "./UserItem";

export const title = "Tabs";

interface UserListProps {
	users: User[];
}

function UserList(props: UserListProps) {
	const { users } = props;

	return (
		<Accordion
			className="flex w-full flex-col gap-2"
			collapsible
			defaultValue={users[0].email}
			type="single"
		>
			{users.map((user) => (
				<AccordionItem
					className="overflow-hidden rounded-lg border bg-background px-4 last:border-b"
					key={user.id}
					value={user.email}
				>
					<AccordionTrigger className="cursor-pointer">
						{user.name}
					</AccordionTrigger>
					<AccordionContent>
						<UserItem user={user} />
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

export default UserList;

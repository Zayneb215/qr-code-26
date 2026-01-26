import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
export interface BaseUser {
	id: number;
}
export interface UserIn {
	name: string;
	email: string;
	age: number | null;
	married: boolean | null;
	phone_number: string | null;
	matriculation_number: string;
}
export interface User extends BaseUser, UserIn {}

export default function useUsers() {
	async function fetchUsers() {
		const token = localStorage.getItem("token");
		const response = await axios.get<User[]>(`${API_BASE_URL}/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}
	async function updateUser(user: User) {
		const token = localStorage.getItem("token");
		const response = await axios.put<User>(
			`${API_BASE_URL}/users/${user.id}`,
			user,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	}
	async function createUser(user: UserIn) {
		const token = localStorage.getItem("token");
		const response = await axios.post<User>(`${API_BASE_URL}/users`, user, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}
	return { fetchUsers, updateUser, createUser };
}

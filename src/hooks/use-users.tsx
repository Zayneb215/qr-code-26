import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
export interface User {
	id: number;
	name: string;
	email: string;
	age: number | null;
	married: boolean | null;
	phone_number: string | null;
	matriculation_number: string;
}

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
	return { fetchUsers };
}

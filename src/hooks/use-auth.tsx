import axios from "axios";
import { API_BASE_URL } from "@/constants/api";

interface LoginResponse {
	access_token: string;
}

export interface LoginData {
	username: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
	name: string;
	last_name: string;
}

export default function useAuth() {
	async function login(data: LoginData) {
		const formData = new URLSearchParams();
		formData.append("username", data.username);
		formData.append("password", data.password);

		const response = await axios.post<LoginResponse>(
			`${API_BASE_URL}/auth/jwt/login`,
			formData,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		localStorage.setItem("token", response.data.access_token);
		return response;
	}

	async function register(data: RegisterData) {
		const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
		return response;
	}

	return { login, register };
}

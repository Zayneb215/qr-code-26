import axios from "axios";
import { API_BASE_URL } from "@/constants/api";

export interface User {
	id: string;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
	name: string;
	last_name: string;
}

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

	async function me() {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No token found");
		}

		const response = await axios.get<User>(`${API_BASE_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response;
	}
	async function logout() {
		localStorage.removeItem("token");
	}

	const isAuthenticated = !!localStorage.getItem("token");

	return { login, register, me, logout, isAuthenticated };
}

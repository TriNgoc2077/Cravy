import axios from "@/utils/axios.customize";

export const registerAPI = (email: string, password: string, name: string) => {
	const url = `/api/v1/auth/register`;
	return axios.post<IBackendRes<IRegister>>(url, { email, password, name });
};

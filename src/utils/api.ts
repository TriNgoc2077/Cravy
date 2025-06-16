import axios from "@/utils/axios.customize";

export const registerAPI = (email: string, password: string, name: string) => {
	const url = `/api/v1/auth/register`;
	return axios.post<IBackendRes<IRegister>>(url, { email, password, name });
};

export const verifyCodeAPI = (email: string, code: string) => {
	const url = `/api/v1/auth/verify-code`;
	return axios.post<IBackendRes<any>>(url, { email, code });
};

export const resendCodeAPI = (email: string) => {
	const url = `/api/v1/auth/verify-email`;
	return axios.post<IBackendRes<any>>(url, { email });
};

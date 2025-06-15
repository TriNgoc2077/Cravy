import axios from "axios";
import { Platform } from "react-native";

const backend =
	Platform.OS === "android"
		? process.env.EXPO_PUBLIC_ANDROID_API_URL
		: process.env.EXPO_PUBLIC_IOS_API_URL;

const instance = axios.create({
	baseURL: backend,
});

// Add a request interceptor
instance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Omit unnecessary fields in response schema, keep only data from backend
		if (response.data) {
			return response.data;
		}
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Keep error data from backend
		if (error?.response?.data) {
			return error?.response?.data;
		}
		return Promise.reject(error);
	}
);
export default instance;

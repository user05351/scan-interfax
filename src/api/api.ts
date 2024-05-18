import axios from "axios"
import Cookies from "js-cookie"
import { TOKEN, URL } from "./const"


export const $axios = axios.create({
	baseURL: URL,
	headers: {
		"Content-Type": "application/json",
	},
})

$axios.interceptors.request.use(
	config => {
		const token = Cookies.get(TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

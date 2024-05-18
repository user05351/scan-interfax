import Cookies from "js-cookie"
import { $axios } from "../api/api"
import { TOKEN } from "../api/const"


export const authService = {
	main: async (
		login: string,
		password: string,
		setIsAuth: (value: boolean) => void
	) => {
		try {
			const { data } = await $axios.post(`/v1/account/login`, {
				login,
				password,
			})

			if (data.accessToken) {
				Cookies.set(TOKEN, data.accessToken)
				setIsAuth(true)
			}
		} catch (error) {
			console.log(error)
		}
	},
}

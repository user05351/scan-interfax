import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import { TOKEN } from "../api/const"
import { useAuth } from "./useAuthPage"

export const useValToken = () => {
	const { isAuth, setIsAuth } = useAuth()

	const { pathname } = useLocation()

	useEffect(() => {
		const token = Cookies.get(TOKEN)
		if (!token) setIsAuth(false)
	}, [pathname, isAuth])
}

import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routerData } from "../data/data"
import { useAuth } from "../hooks/useAuthPage"
import Screen404 from "../components/responsive/Screen404"


const Router: FC = () => {
	const { isAuth } = useAuth()

	return (
		<BrowserRouter>
			<Routes>
				{routerData.map(route => {
					if (route.isAuth && !isAuth) {
						return false
					}

					return (
						<Route
							key={route.path}
							element={<route.component />}
							path={route.path}
						/>
					)
				})}
				<Route element={<Screen404 />} path='*' />
			</Routes>
		</BrowserRouter>
	)
}

export default Router

import { FC, useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthPage"
import { useBurgerMenuContext } from "../../context-providers/BurgerMenuProvider"
import BurgerMenu from "../search-window/burger-menu/BurgerMenu"
import Layout from "../layout/Layout"
import Header from "../header/Header"
import Main from "../main/Main"
import Footer from "../footer/Footer"


const AuthScreen: FC = () => {
	const arrSectionProps = ['auth']

	const navigate = useNavigate()

	const { isViewBurger } = useBurgerMenuContext()
	const { isAuth } = useAuth()

	useEffect(() => {
		if (isAuth) navigate('/')
	}, [isAuth])

	return (
		<Fragment>
			{isViewBurger ? (
				<BurgerMenu />
			) : (
				<Layout>
					<Header />
					<Main arrSectionProps={arrSectionProps} />
					<Footer />
				</Layout>
			)}
		</Fragment>
	)
}

export default AuthScreen

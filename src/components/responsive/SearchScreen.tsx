import { FC, Fragment } from "react"
import { useBurgerMenuContext } from "../../context-providers/BurgerMenuProvider"
import BurgerMenu from "../search-window/burger-menu/BurgerMenu"
import Layout from "../layout/Layout"
import Header from "../header/Header"
import Main from "../main/Main"
import Footer from "../footer/Footer"


const SearchScreen: FC = () => {
	const arrSectionProps = ['search']

	const { isViewBurger } = useBurgerMenuContext()

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

export default SearchScreen

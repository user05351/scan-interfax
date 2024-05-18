import { FC, Fragment, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"
import { $axios } from "../../../api/api"
import { useAuth } from "../../../hooks/useAuthPage"
import { useBurgerMenuContext } from "../../../context-providers/BurgerMenuProvider"
import { TOKEN } from "../../../api/const"
import styles from "./BurgerMenu.module.scss"


const BurgerMenu: FC = () => {
	const navigate = useNavigate()

	const { setIsViewBurger } = useBurgerMenuContext()
	const { isAuth, setIsAuth } = useAuth()

	const logoutHandler = () => {
		Cookies.remove(TOKEN)
		setIsAuth(false)
		navigate('/')
	}

	const [companyLimit, setCompanyLimit] = useState(null)
	const [usedCompanyCount, setUsedCompanyCount] = useState(null)

	if (isAuth) {
		const responseFunc = async () => {
			try {
				const response = await $axios.get('/v1/account/info')

				setCompanyLimit(response.data.eventFiltersInfo.companyLimit)
				setUsedCompanyCount(response.data.eventFiltersInfo.usedCompanyCount)
			} catch (error) {
				console.log(error)
			}
		}
		responseFunc()
	}

	return (
		<div className={styles.wrapper}>
			<div>
				<img
					className={styles.logo}
					src='/svg/scan-logo-footer.svg'
					alt='Логотип Скан'
				/>
				<button onClick={() => setIsViewBurger(false)}>
					<img className={styles.exit} src='/svg/exit-button-icon.svg' alt='Закрыть' />
				</button>
			</div>
			<nav>
				<ul className={styles.menu}>
					<li onClick={() => setIsViewBurger(false)}>
						<Link to={'/'}>Главная</Link>
					</li>
					<li onClick={() => setIsViewBurger(false)}>
						<Link to={'/'}>Тарифы</Link>
					</li>
					<li onClick={() => setIsViewBurger(false)}>
						<Link to={'/'}>FAQ</Link>
					</li>
				</ul>
			</nav>

			{isAuth && window.innerWidth <= 767.98 ? (
				<Fragment>
					<div className={styles.block_company}>
						<div className={styles.block_usedCompany}>
							<p className={styles.used_paragraph}>Использовано компаний</p>
							<p className={styles.used_company}>{usedCompanyCount}</p>
						</div>
						<div className={styles.block_companyLimit}>
							<p className={styles.limit_paragraph}>Лимит по компаниям</p>
							<p className={styles.limit_company}>{companyLimit}</p>
						</div>
					</div>
					<div className={styles.block_avatar}>
						<div>
							<p>Алексей А.</p>
							<button onClick={() => logoutHandler()}>Выйти</button>
						</div>
						<img src='/png/avatar.png' alt='Аватар пользователя' />
					</div>
				</Fragment>
			) : (
				<Fragment>
					<button className={styles.noneButton}>Зарегистрироваться</button>
					<button
						onClick={() => {
							navigate('/auth')
							setIsViewBurger(false)
						}}
						className={styles.mobile_burger}
					>
						Войти
					</button>
				</Fragment>
			)}
		</div>
	)
}

export default BurgerMenu

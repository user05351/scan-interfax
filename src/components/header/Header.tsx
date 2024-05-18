import { FC, Fragment, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { $axios } from "../../api/api"
import Cookies from "js-cookie"
import { useAuth } from "../../hooks/useAuthPage"
import { useBurgerMenuContext } from "../../context-providers/BurgerMenuProvider"
import { TOKEN } from "../../api/const"
import styles from "./Header.module.scss"


const Header: FC = () => {
	const navigate = useNavigate()
	const { setIsViewBurger } = useBurgerMenuContext()
	const { isAuth, setIsAuth } = useAuth()

	const logoutHandler = () => {
		Cookies.remove(TOKEN)
		setIsAuth(false)
		navigate('/')
	}

	const [companyLimit, setCompanyLimit] = useState<null>(null)
	const [usedCompanyCount, setUsedCompanyCount] = useState<null>(null)

	const responseFunc = async () => {
		try {
			const response = await $axios.get('/v1/account/info')

			setCompanyLimit(response.data.eventFiltersInfo.companyLimit)
			setUsedCompanyCount(response.data.eventFiltersInfo.usedCompanyCount)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (isAuth) responseFunc()
	}, [isAuth])

	return (
		<header className={styles.header}>
			<img src='/svg/scan-logo.svg' alt='Логотип СКАН' />
			<div onClick={() => setIsViewBurger(true)} className={styles.burger_menu}>
				<span></span>
			</div>
			<nav>
				<ul className={styles.menu}>
					<li>
						<Link to={'/'}>Главная</Link>
					</li>
					<li>
						<Link to={'/'}>Тарифы</Link>
					</li>
					<li>
						<Link to={'/'}>FAQ</Link>
					</li>
				</ul>
			</nav>
			{isAuth && window.innerWidth >= 767.98 ? (
				<Fragment>
					<div className={styles.block_company}>
						<div className={styles.block_usedCompany}>
							{Cookies.get(TOKEN) ? (
								<Fragment>
									<p className={styles.used_paragraph}>Использовано компаний</p>
									<p className={styles.used_company}>{usedCompanyCount}</p>
								</Fragment>
							) : (
								<Fragment></Fragment>
							)}
						</div>
						<div className={styles.block_companyLimit}>
							{Cookies.get(TOKEN) ? (
								<Fragment>
									<p className={styles.limit_paragraph}>Лимит по компаниям</p>
									<p className={styles.limit_company}>{companyLimit}</p>
								</Fragment>
							) : (
								<Fragment></Fragment>
							)}
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
				<div className={styles['header__block-auth' as const]}>
					<button className={styles.noneButton}>Зарегистрироваться</button>
					<div></div>
					<button
						onClick={() => navigate('/auth')}
						className={styles.button_header}
					>
						Войти
					</button>
				</div>
			)}
		</header>
	)
}

export default Header

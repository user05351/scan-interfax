import { FC, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import { useAuth } from "../../../hooks/useAuthPage"
import { IPropsStyle } from "../../../types/types"
import styles from "./Button.module.scss"


const Button: FC<PropsWithChildren<IPropsStyle>> = ({
	children,
	styleForButton,
}) => {
	const navigate = useNavigate()

	const { isAuth } = useAuth()

	return (
		<button
			onClick={() => (isAuth ? navigate('/') : '')}
			className={clsx(styles[styleForButton], styles.active, {
				[styles.activeMobile]: styleForButton === 'mobile-burger',
			})}
		>
			{children}
		</button>
	)
}

export default Button

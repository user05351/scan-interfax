import { FC, PropsWithChildren } from "react"
import { useValToken } from "../../hooks/useValToken"
import styles from "./Layout.module.scss"


const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	useValToken()

	return <div className={styles.wrapper}>{children}</div>
}

export default Layout

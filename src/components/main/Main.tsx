import { FC } from "react"
import { IMainProps } from "../../types/types"
import Section from "../section/Section"
import styles from "./Main.module.scss"


const Main: FC<IMainProps> = ({ arrSectionProps }) => {
	return (
		<main className={styles.wrapper}>
			{arrSectionProps.map(section => {
				return <Section key={section} section={section} />
			})}
		</main>
	)
}

export default Main

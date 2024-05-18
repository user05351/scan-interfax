import { FC } from "react"
import styles from "./Footer.module.scss"


const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<img src='/svg/scan-logo-footer.svg' alt='Логотип СКАН' />
			<div className={styles['footer__contact-block']}>
				<p>г. Москва, Цветной б-р, 40</p>
				<a href='tel:+74957712111'>+7 495 771 21 11</a>
				<a className={styles['footer__mail']} href='mailto:info@skan.ru'>
					info@skan.ru
				</a>
				<p>Copyright. 2022</p>
			</div>
		</footer>
	)
}

export default Footer

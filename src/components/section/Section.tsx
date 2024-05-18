import { FC, Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import { useAuth, useAuthPage } from "../../hooks/useAuthPage"
import { ISectionProps } from "../../types/types"
import { pricesData } from "../../data/data"
import Button from "../search-window/button/Button"
import SearchForm from "../search-form/SearchForm"
import Slider from "../slider/Slider"
import styles from "./Section.module.scss"


const Section: FC<ISectionProps> = ({ section }) => {
	const { isAuth } = useAuth()
	const navigate = useNavigate()
	const { onSubmit, register, handleSubmit, errors } = useAuthPage()

	const [viewDocuments, setViewDocuments] = useState<never[]>([])
	const [resultData, setResultData] = useState({})
	const [isViewSearch, setIsViewSearch] = useState<boolean>(true)
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const [numberOfPublication, setNumberOfPublication] = useState(10)

	const checkMobilePlatform = window.innerWidth <= 767.98
	const checkMiddleScreenResolution = window.innerWidth <= 1200

	const prevSlide = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1)
		}
	}

	const nextSlide = () => {
		if (
			currentIndex <
			(checkMobilePlatform
				? resultData.data.data[0].data.length - 1
				: resultData.data.data[0].data.length - 3)
		) {
			setCurrentIndex(currentIndex + 1)
		}
	}

	const visibleItems =
		resultData.data &&
		resultData.data.data &&
		resultData.data.data[0] &&
		resultData.data.data[0].data
			? resultData.data.data[0].data.slice(
					currentIndex,
					checkMobilePlatform
						? currentIndex + 1
						: currentIndex + (checkMiddleScreenResolution ? 3 : 8)
			)
			: []
	const visibleItemsRisk =
		resultData.data &&
		resultData.data.data &&
		resultData.data.data[1] &&
		resultData.data.data[1].data
			? resultData.data.data[1].data.slice(
					currentIndex,
					checkMobilePlatform
						? currentIndex + 1
						: currentIndex + (checkMiddleScreenResolution ? 3 : 8)
			)
			: []

	function removeHtmlTags(text: string) {
		return text.replace(/<[^>]*>/g, '')
	}

	function formatDate(inputDate: string) {
		const parts = inputDate.split('T')

		const datePart = parts[0];
		const [year, month, day] = datePart.split('-')

		const formattedDate = `${day}.${month}.${year}`

		return formattedDate
	}

	return (
		<Fragment>
			{
				section === 'home-one' && (
					<section className={clsx(styles[section])}>
						<div className={styles['home-one__block-content']}>
							<h1 className={styles['home-one__title']}>
								сервис по<br />поиску публикаций<br />о компании<br />по
								его ИНН
							</h1>
							<p className={styles['home-one__paragraph']}>
								Комплексный анализ публикаций, получение данных в формате PDF на
								электронную почту.
							</p>
							{isAuth && (
								<button onClick={() => navigate('/search')}>
									Запросить данные
								</button>
							)}
						</div>
						<img
							className={styles['home-one__image']}
							src='/png/home-page-main-pic.png'
							alt='Основное изображение'
						/>
					</section>
				)
			}
			{
				section === 'home-two' && (
					<section className={clsx(styles[section])}>
						<div className={styles['home-two__block-content']}>
							<h2 className={styles['home-two__title']}>Почему именно мы</h2>
							<Slider />
						</div>
						<img
							className={styles['home-two__image']}
							src={
								window.innerWidth <= 991.98
									? '/png/home-page-sec-pic-bg.png'
									: '/png/home-page-sec-pic-sm.png'
							}
							alt='Второе изображение'
						/>
					</section>
				)
			}
			{
				section === 'home-three' && (
					<section className={clsx(styles[section])}>
						<h2>наши тарифы</h2>
						<div
							className={clsx(
								styles['home-three__block-tariff'],
								styles['block-tariff']
							)}
						>
							{pricesData.map(prices => {
								return (
									<div
										key={prices.id}
										className={clsx(styles['block-tariff__tariff'])}
									>
										<div
											className={clsx(styles['block-tariff__title-block'])}
											style={{
												backgroundColor: prices.color,
												color: prices.color === '#000000' ? 'white' : 'black',
											}}
										>
											<div>
												<h3>{prices.title[0]}</h3>
												<p>{prices.title[1]}</p>
											</div>
											<img
												src={prices.img}
												alt='image'
												style={{
													height:
														prices.img === '/svg/bullseye.svg'
															? '110px'
															: '83px',
													position:
														prices.img === '/svg/bullseye.svg'
															? 'absolute'
															: 'static',
												}}
											/>
										</div>
										{isAuth && prices.title[0] === 'Business' ? (
											<p className={styles['block-tariff__active-tariff']}>
												Текущий тариф
											</p>
										) : (
											<Fragment></Fragment>
										)}

										<div className={clsx(styles['block-tariff__price-block'])}>
											<p>{prices.discount}</p>
											<p className={styles['block-tariff__main-price']}>
												{prices.price}
											</p>
										</div>
										<p className={clsx(styles['block-tariff__price-form-month'])}>
											{prices.priceForMonth}
										</p>
										<div className={clsx(styles['block-tariff__bonus-block'])}>
											<p>В тариф входит:</p>
											<ul>
												{prices.bonus.map(elem => {
													return (
														<li key={Math.random() + Math.random()}>
															<img src='/svg/check-mark-green.svg' alt='Галочка' />
															{elem}
														</li>
													)
												})}
											</ul>
										</div>
										{isAuth && prices.title[0] === 'Business' ? (
											<a
												className={
													styles['block-tariff__link-to-personal-area_active']
												}
												href='#'
											>
												Перейти в личный кабинет
											</a>
										) : (
											<a
												className={
													styles[
														'block-tariff__link-to-personal-area_no-active'
													]
												}
												href='#'
											>
												Подробнее
											</a>
										)}
									</div>
								)
							})}
						</div>
					</section>
				)
			}
			{
				section === 'auth' && (
					<section className={clsx(styles[section])}>
						<div className={styles['auth__title-block']}>
							<h2>
								Для оформления подписки на тариф, необходимо авторизоваться.
							</h2>

							{window.innerWidth <= 767.98 ? (
								<div className={styles['auth__block-auth_mobile']}>
									<img
										className={styles.auth__lock}
										src='/svg/lock.svg'
										alt='Замок'
									/>
									<div className={styles['auth__block-state-auth']}>
										<p className={styles['auth__enter']}>Войти</p>
										<p className={styles['auth__registration']}>
											Зарегистрироваться
										</p>
									</div>
									<form onSubmit={handleSubmit(onSubmit)}>
										<label htmlFor='login'>Логин или номер телефона:</label>
										<input
											type='text'
											id='login'
											{...register('login', {
												required: 'Введите корректные данные',
											})}
										/>

										{errors.login && (
											<div style={{ color: 'red', fontSize: '10px' }}>
												{errors.login.message}
											</div>
										)}
										<label htmlFor='password'>Пароль:</label>
										<input
											type='password'
											id='password'
											{...register('password', {
												required: 'Неправильный пароль',
											})}
										/>
										{errors.password && (
											<div style={{ color: 'red', fontSize: '10px' }}>
												{errors.password.message}
											</div>
										)}

										<Button styleForButton={'button-auth'}>Войти</Button>
									</form>
									<a href='#'>Восстановить пароль</a>
									<p className={styles['auth__title-company']}>Войти через:</p>
									<div className={styles['auth__block-company']}>
										<img src='/svg/google.svg' alt='Логотип гугл' />
										<img src='/svg/facebook.svg' alt='Логотип фейсбук' />
										<img src='/svg/yandex.svg' alt='Логотип яндекс' />
									</div>
								</div>
							) : (
								<Fragment></Fragment>
							)}

							<img
								src='/png/people-with-key.png'
								alt='Люди несут ключ'
							/>
						</div>

						{window.innerWidth >= 767.98 ? (
							<div className={styles['auth__block-auth']}>
								<img
									className={styles.auth__lock}
									src='/svg/lock.svg'
									alt='Замок'
								/>
								<div className={styles['auth__block-state-auth']}>
									<p className={styles['auth__enter']}>Войти</p>
									<p className={styles['auth__registration']}>
										Зарегистрироваться
									</p>
								</div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<label htmlFor='login'>Логин или номер телефона:</label>
									<input
										type='text'
										id='login'
										{...register('login', {
											required: 'Введите корректные данные',
										})}
									/>

									{errors.login && (
										<div style={{ color: 'red', fontSize: '10px' }}>
											{errors.login.message}
										</div>
									)}
									<label htmlFor='password'>Пароль:</label>
									<input
										type='password'
										id='password'
										{...register('password', {
											required: 'Неправильный пароль',
										})}
									/>
									{errors.password && (
										<div style={{ color: 'red', fontSize: '10px' }}>
											{errors.password.message}
										</div>
									)}

									<Button styleForButton={'button-auth'}>Войти</Button>
								</form>
								<a href='#'>Восстановить пароль</a>
								<p className={styles['auth__title-company']}>Войти через:</p>
								<div className={styles['auth__block-company']}>
									<img src='/svg/google.svg' alt='Логотип гугл' />
									<img src='/svg/facebook.svg' alt='Логотип фейсбук' />
									<img src='/svg/yandex.svg' alt='Логотип яндекс' />
								</div>
							</div>
						) : (
							<Fragment></Fragment>
						)}
					</section>
				)
			}
			{
				section === 'search' && (
					<section className={clsx(styles[section])}>
						{isViewSearch ? (
							<div className={styles.conditionSearch}>
								<div className={styles['search__block-content']}>
									<h2 className={styles['search__title']}>
										Найдите необходимые данные в пару кликов.
									</h2>
									<p className={styles['search__paragraph']}>
										Задайте параметры поиска. Чем больше заполните, тем точнее
										поиск
									</p>
									<SearchForm
										setIsViewSearch={setIsViewSearch}
										setResultData={setResultData}
										setViewDocuments={setViewDocuments}
									/>
								</div>
								<div
									className={clsx(
										styles['search__block-images'],
										styles['images-block']
									)}
								>
									<img
										className={styles['images-block__document']}
										src='/svg/sheet.svg'
										alt='Лист бумаги'
									/>
									<img
										className={styles['images-block__folders']}
										src='/svg/two-folders.svg'
										alt='Папки'
									/>
									<img
										className={styles['images-block__people']}
										src='/png/rocket.png'
										alt='Ракета'
									/>
								</div>
							</div>
						) : (
							<div className={styles.conditionSearch__result}>
								<section className={clsx(styles['result-one'])}>
									<div className={styles['result__block-content']}>
										<h2 className={styles['result-one__title']}>
											Ищем. Скоро будут результаты
										</h2>
										<p className={styles['result-one__paragraph']}>
											Поиск может занять некоторое время, просим сохранять
											терпение.
										</p>
									</div>
									<img
										src='/png/woman-with-target.png'
										alt='Женщина с мишенью'
									/>
								</section>
								<section className={clsx(styles['result-two'])}>
									<h2 className={styles['result-two__title']}>Общая сводка</h2>
									<p className={styles['result-two__paragraph']}>
										Найдено 4 221 вариантов
									</p>
									<div className={styles['result-two__wrapper-result']}>
										{checkMobilePlatform || checkMiddleScreenResolution ? (
											<button onClick={prevSlide}>
												<img
													src='/svg/slider-arrow-tip-left.svg'
													alt='Стрелка влево'
												/>
											</button>
										) : (
											<button
												onClick={
													resultData.data.data[0].data.length > 9
														? prevSlide
														: undefined
												}
											>
												<img
													src='/svg/slider-arrow-tip-left.svg'
													alt='Стрелка влево'
												/>
											</button>
										)}

										<div className={styles['result-two__block-result_mobile']}>
											<div className={styles['result-block__name_mobile']}>
												<p>Период</p>
												<p>Всего</p>
												<p>Риски</p>
											</div>
											{resultData.data ? (
												visibleItems.map((item, index) => {
													const itemRisk = visibleItemsRisk[index]

													return (
														<div
															key={Math.random()}
															className={styles['result-block__result_mobile']}
														>
															<p>{formatDate(item.date)}</p>
															<p>{item.value}</p>
															<p>{itemRisk.value}</p>
														</div>
													)
												})
											) : (
												<Fragment></Fragment>
											)}
										</div>
										<div
											className={clsx(
												styles['result-two__block-result'],
												styles['result-block']
											)}
										>
											<div className={styles['result-block__name']}>
												<p>Период</p>
												<p>Всего</p>
												<p>Риски</p>
											</div>
											{resultData.data ? (
												visibleItems.map((item, index) => {
													const itemRisk = visibleItemsRisk[index]

													return (
														<div
															key={Math.random()}
															className={styles['result-block__result']}
														>
															<p>{formatDate(item.date)}</p>
															<p>{item.value}</p>
															<p>{itemRisk.value}</p>
														</div>
													)
												})
											) : (
												<Fragment></Fragment>
											)}
										</div>

										{checkMobilePlatform || checkMiddleScreenResolution ? (
											<button onClick={nextSlide}>
												<img
													src='/svg/slider-arrow-tip-right.svg'
													alt='Стрелка вправо'
												/>
											</button>
										) : (
											<button
												onClick={
													resultData.data.data[0].data.length > 9
														? nextSlide
														: undefined
												}
											>
												<img
													src='/svg/slider-arrow-tip-right.svg'
													alt='Стрелка вправо'
												/>
											</button>
										)}
									</div>
								</section>
								<section className={clsx(styles['result-three'])}>
									<h2 className={styles['result-three__title']}>
										Список документов
									</h2>
									<div className={styles['result-three__wrapper-document']}>
										{viewDocuments.map((document, index) => {
											const xmlString = document.ok.content.markup
											const parser = new DOMParser()
											const xmlDoc = parser.parseFromString(
												xmlString,
												'text/xml'
											)
											const xmlText = xmlDoc.documentElement.textContent
											if (index < numberOfPublication) {
												return (
													<div
														key={document.ok.id}
														className={styles['result-three__block-document']}
													>
														<div className={styles['result-three__block-date']}>
															<p>{formatDate(document.ok.issueDate)}</p>
															<p>{document.ok.source.name}</p>
														</div>
														<h2>{document.ok.title.text}</h2>
														<p>
															{document.ok.attributes.isTechNews
																? 'Технические новости'
																: document.ok.attributes.isDigest
																? 'Сводка новостей'
																: document.ok.attributes.isAnnouncement
																? 'Анонс'
																: 'Нейтральная категория'}
														</p>
														<div className={styles['result-three__block-info']}>
															<img src='/png/magic-wand.png' alt='Волшебная палочка' />
															<p>{removeHtmlTags(xmlText)}</p>
														</div>
														<div className={styles['result-three__title']}>
															<a href={document.ok.url}>Читать в источнике</a>
															<p>{document.ok.attributes.wordCount} слов(а)</p>
														</div>
													</div>
												)
											}
										})}
									</div>

									{numberOfPublication <= viewDocuments.length ? (
										<button
											className={styles['result-three__button-show-more']}
											onClick={() =>
												setNumberOfPublication(prevValue => prevValue + 10)
											}
										>
											Показать больше
										</button>
									) : (
										<Fragment></Fragment>
									)}
								</section>
							</div>
						)}
					</section>
				)
			}
		</Fragment>
	)
}

export default Section

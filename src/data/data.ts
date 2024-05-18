import {
	IRoute,
	IPrices,
	ISliderContent,
} from "../types/types"
import AuthScreen from "../components/responsive/AuthScreen"
import HomeScreen from "../components/responsive/HomeScreen"
import SearchScreen from "../components/responsive/SearchScreen"


export const routerData: IRoute[] = [
	{
		path: '/',
		component: HomeScreen,
		isAuth: false,
	},
	{
		path: '/auth',
		component: AuthScreen,
		isAuth: false,
	},
	{
		path: '/search',
		component: SearchScreen,
		isAuth: true,
	},
]

export const pricesData: IPrices[] = [
	{
		id: 1,
		title: ['Beginner', 'Для небольшого исследования'],
		img: '/svg/lightbulb.svg',
		color: 'rgba(255, 182, 79, 1)',
		price: '1 200 ₽',
		discount: '799 ₽',
		priceForMonth: 'или 150 ₽/мес. при рассрочке на 24 мес.',
		bonus: [
			'Безлимитная история запросов',
			'Безопасная сделка',
			'Поддержка 24/7',
		],
	},
	{
		id: 2,
		title: ['Pro', 'Для HR и фрилансеров'],
		img: '/svg/bullseye.svg',
		color: 'rgba(124, 227, 225, 1)',
		price: '2 600 ₽',
		discount: '1 299 ₽',
		priceForMonth: 'или 279 ₽/мес. при рассрочке на 24 мес.',
		bonus: [
			'Все пункты тарифа Beginner',
			'Экспорт истории',
			'Рекомендации по приоритетам',
		],
	},
	{
		id: 3,
		title: ['Business', 'Для корпоративных клиентов'],
		img: '/svg/laptop.svg',
		color: '#000000',
		price: '3 700 ₽',
		discount: '2 379 ₽',
		priceForMonth: '',
		bonus: [
			'Все пункты тарифа Pro',
			'Безлимитное количество запросов',
			'Приоритетная поддержка',
		],
	},
]

export const sliderData: ISliderContent[] = [
	{
		id: 1,
		img: '/svg/clock.svg',
		description: 'Высокая и оперативная скорость обработки заявки',
	},
	{
		id: 2,
		img: '/svg/magnifier.svg',
		description:
			'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
	},
	{
		id: 3,
		img: '/svg/lock-transparent.svg',
		description:
			'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
	},
	{
		id: 4,
		img: '/svg/clock.svg',
		description: 'Высокая и оперативная скорость обработки заявки',
	},
	{
		id: 5,
		img: '/svg/magnifier.svg',
		description:
			'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
	},
	{
		id: 6,
		img: '/svg/lock-transparent.svg',
		description:
			'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
	},
]

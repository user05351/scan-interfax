import { Dispatch, SetStateAction } from "react"
import { UseFormRegister, FieldValues } from "react-hook-form"


export interface IRoute {
	path: string
	component: React.FC
	isAuth: boolean
}

export interface IAuthContext {
	isAuth: boolean
	setIsAuth: Dispatch<SetStateAction<boolean>>
}

export interface IBurgerMenuContext {
	isViewBurger: boolean
	setIsViewBurger: Dispatch<SetStateAction<boolean>>
}

export interface IFormInput {
	login: string
	password: string
}

export interface IMainProps {
	arrSectionProps: string[]
}

export interface ISectionProps {
	section?: string
}

export interface IPrices {
	id: number
	title: string[]
	img: string
	color: string
	price: string
	discount: string
	priceForMonth: string
	bonus: string[]
}

export interface IPropsStyle {
	styleForButton: string
}

export interface ICheckboxProps {
	id: string
	register: UseFormRegister<FieldValues>
}

export interface IInputProps {
	inn?: boolean
	register: UseFormRegister<FieldValues>
}

export interface IStateResultData {
	setResultData: Dispatch<SetStateAction<object>>
	setIsViewSearch: Dispatch<SetStateAction<boolean>>
	setViewDocuments: Dispatch<SetStateAction<any>>
}

export interface ISliderContent {
	id: number
	img: string
	description: string
}

export type TAuthReturn = {
	isAuth: boolean
	setIsAuth: Dispatch<SetStateAction<boolean>>
}

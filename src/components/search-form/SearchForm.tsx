import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import clsx from "clsx"
import { $axios } from "../../api/api"
import { IStateResultData } from "../../types/types"
import Input from "../search-window/input/Input"
import Checkbox from "../search-window/checkbox/Checkbox"
import styles from "./SearchForm.module.scss"


const SearchForm: FC<IStateResultData> = ({
	setIsViewSearch,
	setResultData,
	setViewDocuments,
}) => {
	const [colorDateStart, setColorDateStart] = useState<number>(0)
	const [colorDateEnd, setColorDateEnd] = useState<number>(0)

	let test = {
		ids: [],
	}

	const [dataValue, setDataValue] = useState({
		issueDateInterval: {
			startDate: '',
			endDate: '',
		},
		attributeFilters: {
			excludeTechNews: true,
			excludeAnnouncements: true,
			excludeDigests: true,
		},
		similarMode: 'duplicates',
		sortType: 'sourceInfluence',
		sortDirectionType: 'desc',
		intervalType: 'month',
		histogramTypes: ['totalDocuments', 'riskFactors'],
	})

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	})

	const responseDocuments = async () => {
		try {
			const response = await $axios.post('/v1/documents', test)

			setViewDocuments(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const objectSearchForDocuments = async (postObject: object) => {
		try {
			const response = await $axios.post('/v1/objectsearch', postObject)

			response.data.items.forEach(elem => {
				test.ids.push(elem.encodedId)
			})

			responseDocuments()
		} catch (error) {
			console.log(error)
		}
	}

	const onSubmit = async () => {
		const searchContext = {
			targetSearchEntitiesContext: {
				targetSearchEntities: [
					{
						type: 'company',
						sparkId: null,
						entityId: null,
						inn: Number(getValues('inn')),
						maxFullness: true,
						inBusinessNews: null,
					},
				],
				onlyMainRole: true,
				tonality: 'any',
				onlyWithRiskFactors: true,
			},
		}
		const limit = Number(getValues('limit'))
		const issueDateInterval = {
			startDate: getValues('startDate'),
			endDate: getValues('endDate'),
		}

		const updateDate = {
			...dataValue,
			searchContext,
			limit,
			issueDateInterval,
		}

		try {
			const response = await $axios.post(
				'/v1/objectsearch/histograms',
				updateDate
			)

			setResultData(response)
			setIsViewSearch(false)

			await objectSearchForDocuments(updateDate)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form
			className={clsx(styles['search__form'], styles.form)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className={styles['form__block-input']}>
				<Input inn={true} register={register}>
					ИНН компании *
				</Input>
				{errors.inn && (
					<div style={{ color: 'red', fontSize: '10px' }}>
						{errors.inn.message}
					</div>
				)}
				<div className={styles['form__block-select']}>
					<label className={styles['form__label-select']} htmlFor='select'>
						Тональность
					</label>
					<select
						defaultValue='any'
						id='select'
						{...register(`tonality`, {
							required: 'Введите корректные данные',
						})}
					>
						<option value='positive'>Позитивная</option>
						<option value='negative'>Негативная</option>
						<option value='any'>Любая</option>
					</select>
				</div>
				<Input inn={false} register={register}>
					Количество документов в выдаче *
				</Input>
				{errors.limit && (
					<div style={{ color: 'red', fontSize: '10px' }}>
						{errors.limit.message}
					</div>
				)}
				<div className={styles['form__block-data-input']}>
					<label>
						Диапазон поиска *
						<input
							className={clsx({
								[styles.start_data]: colorDateStart === 0,
								[styles.start_data_noBefore]: colorDateStart === 1,
							})}
							type='date'
							onClick={() => setColorDateStart(1)}
							style={{
								color: `rgba(0, 0, 0, ${colorDateStart})`,
							}}
							{...register(`startDate`, {
								required: 'Поле обязательно для заполнения',
							})}
						/>
						{errors.startDate && (
							<div style={{ color: 'red', fontSize: '10px' }}>
								{errors.startDate.message}
							</div>
						)}
					</label>
					<label>
						<input
							className={clsx({
								[styles.end_data]: colorDateEnd === 0,
								[styles.end_data_noBefore]: colorDateEnd === 1,
							})}
							type='date'
							max={Date.now()}
							onClick={() => setColorDateEnd(1)}
							style={{
								color: `rgba(0, 0, 0, ${colorDateEnd})`,
							}}
							{...register(`endDate`, {
								required: 'Поле обязательно для заполнения',
							})}
						/>
						{errors.endDate && (
							<div style={{ color: 'red', fontSize: '10px' }}>
								{errors.endDate.message}
							</div>
						)}
					</label>
				</div>
			</div>
			<div className={styles['form__block-checkbox']}>
				<div>
					<Checkbox id={'max'} register={register}>
						Признак максимальной полноты
					</Checkbox>
					<Checkbox id={'context'} register={register}>
						Упоминания в бизнес-контексте
					</Checkbox>
					<Checkbox id={'public'} register={register}>
						Главная роль в публикации
					</Checkbox>
					<Checkbox id={'factors'} register={register}>
						Публикации только с риск-факторами
					</Checkbox>
					<Checkbox id={'news'} register={register}>
						Включать технические новости рынков
					</Checkbox>
					<Checkbox id={'calendar'} register={register}>
						Включать анонсы и календари
					</Checkbox>
					<Checkbox id={'onNews'} register={register}>
						Включать сводки новостей
					</Checkbox>
				</div>
				<button type='submit' className={styles['button-search']}>
					Поиск
				</button>
				<p className={styles['form__help']}>* Обязательные к заполнению поля</p>
			</div>
		</form>
	)
}

export default SearchForm

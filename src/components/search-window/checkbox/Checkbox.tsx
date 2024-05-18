import { FC, useState, PropsWithChildren } from "react"
import clsx from "clsx"
import { ICheckboxProps } from "../../../types/types"
import styles from "./Checkbox.module.scss"


const Checkbox: FC<PropsWithChildren<ICheckboxProps>> = ({
	children,
	id,
	register,
}) => {
	const [checkOn, setCheckOn] = useState<boolean>(false)

	const handleChange = () => {
		setCheckOn(!checkOn)
	}

	return (
		<div className={styles.wrapper}>
			<button
				className={clsx({
					[styles.button]: !checkOn,
					[styles.button_active]: checkOn,
				})}
				onClick={e => {
					e.preventDefault()
					setCheckOn(!checkOn)
				}}
			>
				{checkOn && <img src='/svg/check-mark-green.svg' alt='Галочка' />}
				<input
					id={id}
					type='checkbox'
					{...register(`${id}`)}
					checked={checkOn}
					onChange={handleChange}
				/>
			</button>

			<label
				htmlFor={id}
				className={clsx({
					[styles.label]: !checkOn,
					[styles.label_active]: checkOn,
				})}
			>
				{children}
			</label>
		</div>
	)
}

export default Checkbox

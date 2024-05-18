import { useMemo, useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { authService } from "../service/service"
import { AuthContext } from "../context-providers/AuthProvider"
import { IFormInput, TAuthReturn } from "../types/types"


export const useAuth = (): TAuthReturn => useContext(AuthContext)

export const useAuthPage = () => {
	const { setIsAuth } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		mode: "onChange",
	})

	const onSubmit: SubmitHandler<IFormInput> = async data => {
		authService.main(data.login, data.password, setIsAuth)
	}

	return useMemo(() => {
		return {
			onSubmit,
			register,
			handleSubmit,
			errors,
		}
	}, [errors])
}

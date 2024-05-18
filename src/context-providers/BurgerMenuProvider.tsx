import {
    FC,
    useState,
    useContext,
    useMemo,
    createContext,
    PropsWithChildren,
} from "react"
import { IBurgerMenuContext } from "../types/types"


const BurgerMenuContext = createContext<IBurgerMenuContext>({} as IBurgerMenuContext)

export const BurgerMenuProvider: FC<PropsWithChildren<unknown>> = ({
	children,
}) => {
	const [isViewBurger, setIsViewBurger] = useState(false)

	const value = useMemo(
		() => ({
			isViewBurger,
			setIsViewBurger,
		}),
		[isViewBurger]
	)

	return (
		<BurgerMenuContext.Provider value={value}>{children}</BurgerMenuContext.Provider>
	)
}

export const useBurgerMenuContext = () => useContext(BurgerMenuContext)

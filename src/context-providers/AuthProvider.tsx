import {
    FC,
    useState,
    createContext,
    PropsWithChildren,
} from "react"
import Cookies from "js-cookie"
import { IAuthContext } from "../types/types"
import { TOKEN } from "../api/const"


export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(!!Cookies.get(TOKEN))

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

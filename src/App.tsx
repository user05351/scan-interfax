import ReactDOM from 'react-dom/client'
import AuthProvider from './context-providers/AuthProvider'
import { BurgerMenuProvider } from './context-providers/BurgerMenuProvider'
import Router from './router/Router'
import "./App.scss"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BurgerMenuProvider>
      <Router />
    </BurgerMenuProvider>
  </AuthProvider>
)

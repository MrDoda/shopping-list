import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Detail } from './Pages/Detail'
import { Login } from './Pages/Login'
import { Pages } from './store/pages'
import { useStore } from './store/useStore'
import { appStore } from './store/appStore'
import { TopBar } from './Components/TopBar'

const ProtectedRoute = ({ element }: { element: React.ReactNode | null }) => {
  const token = useStore(appStore, 'token')
  const isAuthenticated = !!token
  return isAuthenticated ? element : <Navigate to={Pages.Login} />
}

export const Router = () => {
  return (
    <HashRouter>
      <TopBar />
      <Routes>
        <Route path={Pages.Login} element={<Login />} />
        <Route
          path={Pages.Home}
          element={<ProtectedRoute element={<Home />} />}
        />
        <Route
          path={`${Pages.Detail}/:id`}
          element={<ProtectedRoute element={<Detail />} />}
        />
      </Routes>
    </HashRouter>
  )
}

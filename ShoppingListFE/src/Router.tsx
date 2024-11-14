import { Routes, Route, HashRouter } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Detail } from './Pages/Detail'
import { Pages } from './store/pages'

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={Pages.Home} element={<Home />} />
        <Route path={`${Pages.Detail}/:id`} element={<Detail />} />
      </Routes>
    </HashRouter>
  )
}

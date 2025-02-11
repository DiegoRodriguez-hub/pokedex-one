import { Route, Routes } from 'react-router'
import Home from '../app/home/home'
import Pokedex from '../app/pokedex/Pokedex'
import Pokemon from '../app/pokemon/Pokemon'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokedex'>
        <Route index element={<Pokedex />} />
        <Route path=':name' element={<Pokemon />} />
        </Route>
    </Routes>
  )
}

export default AppRouter
import { useEffect, useState } from 'react'
import { useName } from '../../hooks/useName'
import axios from 'axios'
import PokemonList from './components/PokemonList'
import { Link } from 'react-router'

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [fitleredPokemons, setFilteredPokemons] = useState([])
  const [search, setSearch] = useState('')
  const [selectType, setSelectedType] = useState('all')
  const [types, setTypes] = useState([])
  const [singlePokemon, setSinglePokemon] = useState(null)

  const { name, clearName } = useName()

  //funcion para cargar primeros 20 pokemones
  const getInitialPokemons = () => {
    axios
    .get(`${POKEAPI_BASE}/pokemon?limit=150`)
    .then(({ data }) => {
      setPokemons(data.results)
      setFilteredPokemons(data.results)
      setSinglePokemon(null)
    })  
  }

  useEffect(() => {
    getInitialPokemons()
  }, [])

  //cargar los tipos de pokémon
  useEffect(() => {
    axios.get(`${POKEAPI_BASE}/type?limit=18`)
      .then(({ data }) => setTypes(data.results))
  }, [])

  //filtrar en tiempo real mientras se escribe en el input
  useEffect(() => {
    if (!search) {
      setFilteredPokemons(pokemons)
      setSinglePokemon(null)
      return
    }

    setFilteredPokemons(
      pokemons.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ))
  }, [search, pokemons])

  //cargar pokemon segun el tipo seleccionado
  useEffect(() => {
    if (selectType === 'all') {
      getInitialPokemons()
      return      
    }

    axios.get(`${POKEAPI_BASE}/type/${selectType}`)
      .then(({ data }) => {
        const typePokemons = data.pokemon.map(p => p.pokemon)
        setPokemons(typePokemons)
        setFilteredPokemons(typePokemons)
        setSinglePokemon(null)
      })
  }, [selectType])


  const searchPokemon = () => {
    if (!search) {
      getInitialPokemons()
      return
    }

    axios.get(`${POKEAPI_BASE}/pokemon/${search}`)
      .then(({ data }) => {
        if (selectType !== 'all') {
          const isOfType = data.types.some(t => t.type.name === selectType)
          if (!isOfType) {
            setSinglePokemon(null)
            alert('El pokemon no es del tipo seleccionado')
            return
          }
        }
        setSinglePokemon(data)
      })
      .catch(() => {
        alert('Pokemón no encontrado')
        setSinglePokemon(null)
      })
  }

  return (
    <div>
      <h1>Pokedex</h1>
      {name && <div>
        <p>Bienvenido {name}, aqui podrás encontrar a tu pokemon favorito</p>
        </div>
        }

      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='filter or search by name or id'
        onKeyDown={() => e.key === 'Enter' && searchPokemon()}
      />
      <button onClick={searchPokemon}>Search</button>
      <select
        value={selectType}
        onChange={(e) => setSelectedType(e.target.value)}>
        <option value="all">all</option>
        {types.map(type => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      {singlePokemon ?
        <Link to={`/pokedex/${singlePokemon.name}`}>
          <h2>{singlePokemon?.name}</h2>
          <img src={singlePokemon?.sprites?.font_default} alt={singlePokemon.name} />
        </Link>
        :
      <PokemonList pokemons={fitleredPokemons} />
      }
    </div>
  )
}

export default Pokedex
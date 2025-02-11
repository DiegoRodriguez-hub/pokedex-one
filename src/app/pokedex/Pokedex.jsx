import { useEffect, useState } from 'react'
import { useName } from '../../hooks/useName'
import axios from 'axios'
import PokemonList from './components/PokemonList'

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [fitleredPokemons, setFilteredPokemons] = useState([])
  const [search, setSearch] = useState('')
  const [selectType, setSelectedType] = useState('all')
  const [types, setTypes] = useState([])
  const [singlePokemon, setSinglePokemon] = useState(null)

  const { name } = useName()

  //funcion para cargar primeros 20 pokemones
  const getInitialPokemons = () => {
    axios
    .get(`${POKEAPI_BASE}/pokemon?limit=150`)
    .then(({ data }) => {
      setPokemons(data.results)
      setFilteredPokemons(data.results)
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
      return
    }

    setFilteredPokemons(
      pokemons.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    )
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
            alert('El pokemon no es del tipo seleccionado')
            return
          }
        }
        console.log(fitleredPokemons)
        setSinglePokemon(data)
      })
      .catch(() => {
        alert('Pokemón no encontrado')
      })
  }

  return (
    <div>
      <h1>Pokedex</h1>
      {name && <p>Bienvenido {name}, aqui podrás encontrar a tu pokemon favorito</p>}
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='filter or search by name or id'
      />
      <button>Search</button>
      <select
        value={selectType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="all">all</option>
        {types.map(type => (
          <option key={type.name} value={type.name}>{type.name}
          </option>
        ))}
      </select>

      {singlePokemon &&
        <div>
          <h2>{singlePokemon?.name}</h2>
          <img src={singlePokemon?.sprites?.font_default} alt={singlePokemon.name} />
        </div>
      }

      <PokemonList pokemons={fitleredPokemons} />
    </div>
  )
}

export default Pokedex
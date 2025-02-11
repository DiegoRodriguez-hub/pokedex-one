import axios from 'axios'
import { useEffect, useState } from 'react'

function PokemonCard({ url }) {
    const[pokemon, setPokemon] = useState({})

    useEffect(() => {
        axios.get(url)
        .then(({ data }) => setPokemon(data))
    }, [url])

    if (!pokemon) return <p>cargando...</p>

  return (
    <div>
        <h2>{pokemon?.name}</h2>
        <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
    </div>
  )
}

export default PokemonCard
import PokemonCard from './PokemonCard'

function PokemonList({ pokemons }) {
  return (
    <>
        {pokemons.map(pokemon => 
            <PokemonCard
             key={pokemon.name}
             url={pokemon.url}
            />
        )}
    </>
  )
}

export default PokemonList
import { useEffect, useState } from 'react';
import './App.css';
import { PokeCard } from './components/pokecard/pokecard';
import { Pokemon, getPokemons } from './components/axios/getPokemons';

export default function App () {
  const [pokemons, setPokemon] = useState<Pokemon[]>([])
  useEffect( () => {getPokemons().then(data => {setPokemon(data)})}, [])
  return (
    <div id="app">
      <div className="container">
        <div className='pokemon-deck'>
          {pokemons.map(pokemon => 
          <PokeCard 
            key = {pokemon.pokemonNum} 
            pokemonNum = {pokemon.pokemonNum} 
            pokemonName={pokemon.pokemonName} 
            pokemonTypes = {pokemon.pokemonTypes} 
            width={320} height={380}/>
          )}
        </div>
      </div>
    </div>
  )
}


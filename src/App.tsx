import { useEffect, useState } from 'react';
import './App.css';
import { PokeCard } from './components/pokecard/pokecard';
import { Pokemon, getPokemons } from './components/axios/getPokemons';
import pokeTitle from './assets/international_pokemon_logo.png'
import { SearchBar } from './components/searchBar/searchBar';

export default function App () {
  const [pokemons, setPokemon] = useState<Pokemon[]>([])
  useEffect( () => {getPokemons().then(data => {setPokemon(data)})}, [])
  return (
    <div id="app">
      <div className="container">
        <img className='title-img' src={pokeTitle} alt={'title'}/>
        <SearchBar/>
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


import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { PokeCard } from './components/pokecard/pokecard';
import { Pokemon, getPokemons } from './components/axios/getPokemons';
import pokeTitle from './assets/international_pokemon_logo.png'
import { SearchBar } from './components/searchBar/searchBar';
import LoadingScreen from './components/loadingScreen/LoadingScreen';

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPokemons().then((data) => {
      setPokemons(data);
      setIsLoading(false);
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    if (!isLoading) {
      setIsLoading(true);
      getPokemons().then((data) => {
        setPokemons((prevPokemons) => [...prevPokemons, ...data]);
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isLoading]);

  return (
    <div id="app">
      <div className="container">
        <img className="title-img" src={pokeTitle} alt="title" />
        <SearchBar />
        {isLoading === true ? <LoadingScreen/> : ""}
    
          <div className="pokemon-deck">
            {pokemons.map((pokemon) => (
              <PokeCard
                key={pokemon.pokemonNum}
                pokemonNum={pokemon.pokemonNum}
                pokemonName={pokemon.pokemonName}
                pokemonTypes={pokemon.pokemonTypes}
                width={320}
                height={380}
              />
            ))}
          </div>
        
      </div>
    </div>
  );
}
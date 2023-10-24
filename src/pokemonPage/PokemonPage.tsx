import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonEvoLines from "../components/PokemonEvoLine/PokemonEvoLine";
import PokemonTypesAndWeaknes from "../components/PokemonTypesAndWeaknes/PokemonTypesAndWeaknes";
import getAdvancedPokemon, { AdvancePokemon } from "../components/axios/getAdvacedPokemon";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import './PokemonPage.css';

export default function PokemonPage() {
  const { id } = useParams<{ id?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<AdvancePokemon>();

  var url = '';
  const pokeNum = pokemon?.pokemonNum ?? 0
  if (pokeNum > 649) {
    url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`
  }
  else url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokeNum}.gif`;

  useEffect(() => {
    getAdvancedPokemon(id ?? '').then((data) => {
      setPokemon(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <LoadingScreen />
  }

  const pokemonEvo = pokemon?.pokemonEvolutionLine || [];

  return (
    <div id="PokemonPage">
      <div className="pageContent">
        <div className="inner-up">
          <div className="pokeFrame">
            <div className="pokeName">
              {pokemon?.pokemonName}
            </div>
            <div className="pokeNum">
              #{String(pokemon?.pokemonNum).padStart(4, '0')}
            </div>
            <img className="pokemon-image" src={url} alt="pokemon" />
          </div>
          <PokemonTypesAndWeaknes types={pokemon?.pokemonTypes ?? []} pokeWeaknes={pokemon?.pokemonWeaknes ?? []} />
        </div>
        <PokemonEvoLines pokemonEvolutionLine={pokemonEvo} />
      </div>
    </div>
  )
}


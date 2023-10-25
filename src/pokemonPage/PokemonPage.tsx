import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonEvoLines from "../components/PokemonEvoLine/PokemonEvoLine";
import PokemonTypesAndWeaknes from "../components/PokemonTypesAndWeaknes/PokemonTypesAndWeaknes";
import { AdvancePokemon, getAdvancedPokemon } from "../components/axios/getAdvacedPokemon";
import { usePokemonImage } from "../components/axios/getPokemonImage";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import './PokemonPage.css';

const PokemonPage = () => {
  const { id } = useParams<{ id?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<AdvancePokemon | undefined>(undefined);
  const pokeNum = pokemon?.pokemonNum ?? 0;

  useEffect(() => {
    getAdvancedPokemon(id ?? '').then((data) => {
      setPokemon(data);
      setIsLoading(false);
    });
  }, [id]);

  const imageUrl = usePokemonImage(pokeNum);

  if (isLoading) {
    return <LoadingScreen />;
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
            <img className="pokemon-image" src={imageUrl} alt="pokemon" />
          </div>
          <PokemonTypesAndWeaknes types={pokemon?.pokemonTypes ?? []} pokeWeaknes={pokemon?.pokemonWeaknes ?? []} />
        </div>
        <PokemonEvoLines pokemonEvolutionLine={pokemonEvo} />
      </div>
    </div>
  );
};

export default PokemonPage;
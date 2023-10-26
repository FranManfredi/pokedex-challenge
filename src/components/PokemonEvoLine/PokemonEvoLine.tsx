import { PokemonEvolLine } from "../hooks/getAdvacedPokemon";
import { PokeCard } from "../pokecard/pokecard";
import './PokemonEvoLine.css'
  
const PokemonEvolLines = (props: { pokemonEvolutionLine: PokemonEvolLine[][] }) => {
  if (props.pokemonEvolutionLine === undefined) return <div></div>;
  return (
    <div className="pokemonEvolLine">
      {props.pokemonEvolutionLine.map((evolLine, index) => {
        return (
          <div className="evolLine" key={index}>
            {evolLine.map((evol: { id: number; name: string; type: string[]; }) => (
              <PokeCard key={evol.id} pokemonNum={evol.id} pokemonName={evol.name} pokemonTypes={evol.type} width={300} height={400} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PokemonEvolLines;
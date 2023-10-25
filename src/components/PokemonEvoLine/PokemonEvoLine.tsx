import { PokeCard } from "../pokecard/pokecard";
import './PokemonEvoLine.css'
  
const PokemonEvolLines = (props: { pokemonEvolutionLine: any[][] }) => {
  console.log(props.pokemonEvolutionLine);
  if (props.pokemonEvolutionLine === undefined) return <div></div>;
  return (
    <div className="pokemonEvolLine">
      {props.pokemonEvolutionLine.map((evolLine, index) => {
        return (
          <div className="evolLine" key={index}>
            {evolLine.map((evol: { id: any; name: any; type: any; }) => (
              <PokeCard key={evol.id} pokemonNum={evol.id} pokemonName={evol.name} pokemonTypes={evol.type} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PokemonEvolLines;
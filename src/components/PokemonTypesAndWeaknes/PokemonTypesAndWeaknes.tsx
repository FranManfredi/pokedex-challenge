
import "./PokemonTypesAndWeaknes.css"

const PokemonTypesAndWeaknes = ({ types, pokeWeaknes }: { types: string[], pokeWeaknes: string[] }) => {
    console.log(pokeWeaknes);
    return (
      <div className="up-right">
        <div className="typesTitle">Types</div>
        <div className="types">
          {types.map((type) => (
            <div className={`pokemon-type ${type}`} key={type}>
              <div className="text-types">{type}</div>
            </div>
          ))}
        </div>
        <div className="weaknesTitle" >Weaknesses</div>
        <div className="types">
          {pokeWeaknes.map((weaknes) => (
            <div className={`pokemon-type ${weaknes}`} key={weaknes}>
              <div className="text-types">{weaknes}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PokemonTypesAndWeaknes;
  
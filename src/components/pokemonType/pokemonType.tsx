import './pokemonType.css'

interface PokemonTypeProps {
    type: string;
  }

function PokemonType(props: PokemonTypeProps) {
    return (
        <div className="pokemon-type" style={{background: "linear-gradient(45deg, #ADD8E6 0%, #ADD8E6 50%, #009fd4 50%, #009fd4 100%)",}} data-atropos-offset="2" ></div>
    );
}

export {PokemonType};
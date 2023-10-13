import './pokemonType.css'

interface PokemonTypeProps {
    types: string[];
}

function PokemonType(props: PokemonTypeProps) {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: "10%", zIndex: 3,position: 'absolute', top: "55%",left: "10%", width: "80%", height: "30%"}} data-atropos-offset="2" >
          {props.types.map((type, index) => (
            <div
              key={index}
              className="pokemon-type"
              style={{
                background:
                    type === "water"
                    ? "linear-gradient(45deg, #ADD8E6 0%, #ADD8E6 50%, #009fd4 50%, #009fd4 100%)"
                    : type === "fire"
                    ? "linear-gradient(45deg, orange 0%, orange 50%, red 50%, red 100%)"
                    : type === "grass"
                    ? "linear-gradient(45deg, #ADD8E6 0%, #ADD8E6 50%, #009fd4 50%, #009fd4 100%)"
                    : "linear-gradient(45deg, #ADD8E6 0%, #ADD8E6 50%, #009fd4 50%, #009fd4 100%)",
              }}
              data-atropos-offset="2"
            >
                <h3>{type}</h3>
            </div>
          ))}
        </div>
      );
}

export {PokemonType};
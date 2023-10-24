import './pokemonType.css'

interface PokemonTypeProps {
    types: string[];
}

function PokemonType(props: PokemonTypeProps) {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: "10%", zIndex: 3, width: "80%", height: "100%", marginTop: "5%"}} data-atropos-offset="2" >
          {props.types.map((type, index) => (
            <div
              key={index}
              className="pokemon-types"
              style={{
                background:
                    type === "water"
                    ? "linear-gradient(45deg, #ADD8E6 0%, #ADD8E6 50%, #009fd4 50%, #009fd4 100%)"
                    : type === "fire"
                    ? "linear-gradient(45deg, orange 0%, orange 50%, red 50%, red 100%)"
                    : type === "grass"
                    ? "linear-gradient(45deg, #5de56a 0%, #5de56a 50%, #41a94c 50%, #41a94c 100%)"
                    : type === "electric"
                    ? "linear-gradient(45deg, #f7df00 0%, #f7df00 50%, orange 50%, orange 100%)"
                    : type === "ice"
                    ? "linear-gradient(45deg, #b3ffff 0%, #b3ffff 50%, #00ffff 50%, #00ffff 100%)"
                    : type === "bug"
                    ? "linear-gradient(45deg, #bfff00 0%, #bfff00 50%, #a3c900 50%, #a3c900 100%)"
                    : type === "normal"
                    ? "linear-gradient(45deg, #ffffff 0%, #ffffff 50%, #c0c0c0 50%, #c0c0c0 100%)"
                    : type === "poison"
                    ? "linear-gradient(45deg, #ff00ff 0%, #ff00ff 50%, #800080 50%, #800080 100%)"
                    : type === "ground"
                    ? "linear-gradient(45deg, #996600 0%, #996600 50%, #ffbf00 50%, #ffbf00 100%)"
                    : type === "flying"
                    ? "linear-gradient(45deg, silver 0%,silver 50%,  #00ffff 50%, #00ffff 100%)"
                    : type === "psychic"
                    ? "linear-gradient(45deg, #ff00ff 0%, #ff00ff 50%, #f7a7f7 50%, #f7a7f7 100%)"
                    : type === "fighting"
                    ? "linear-gradient(45deg, #c8681a 0%, #c8681a 50%, #e2a16b 50%, #e2a16b 100%)"
                    : type === "rock"
                    ? "linear-gradient(45deg, #404040 0%, #404040 50%, #808080 50%, #808080 100%)"
                    : type === "ghost"
                    ? "linear-gradient(45deg, #800080 0%, #800080 50%, #630063 50%, #630063 100%)"
                    : type === "dragon"
                    ? "linear-gradient(45deg, #ff8f34 0%, #ff8f34 50%, #00eeff 50%, #00eeff 100%)"
                    : type === "dark"
                    ? "linear-gradient(45deg, #000000 0%, #000000 50%, #404040 50%, #404040 100%)"
                    : type === "steel"
                    ? "linear-gradient(45deg, #808080 0%, #808080 50%, #c0c0c0 50%, #c0c0c0 100%)"
                    : type === "fairy"
                    ? "linear-gradient(45deg, #ff5fa9 0%, #ff5fa9 50%, #ff99ff 50%, #ff99ff 100%)"
                    : "white",
                border:
                    type === "normal" 
                    ? "0.5px solid grey"
                    : ""
              }}
              data-atropos-offset="2">
                <h3 style={{
                  color:
                  type === "rock" || type === "ghost" || type === "dark" ? "white" : "black",
                }}>
                  {type}
                </h3>
            </div>
          ))}
        </div>
      );
}

export {PokemonType};
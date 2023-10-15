
interface CardBackgroundProps {
    type: string;
}

function CardBackground({type} : CardBackgroundProps) {
    return (
        <div className="card-background" 
        style={{
            background:
                type === "water"
                    ? "linear-gradient(45deg, #ADD8E6 0%, #009fd4 100%)"
                : type === "fire"
                    ? "linear-gradient(45deg, orange 0%, red 100%)"
                : type === "grass"
                    ? "linear-gradient(45deg, #5de56a 0%, #41a94c 100%)"
                : type === "electric"
                    ? "linear-gradient(45deg, #f7df00 0%, orange 100%)"
                : type === "ice"
                    ? "linear-gradient(45deg, #b3ffff 0%, #00ffff 100%)"
                : type === "bug"
                    ? "linear-gradient(45deg, #bfff00 0%, #a3c900 100%)"
                : type === "normal"
                    ? "linear-gradient(45deg, #ffffff 0%, #c0c0c0 100%)"
                : type === "poison"
                    ? "linear-gradient(45deg, #ff00ff 0%, #800080 100%)"
                : type === "ground"
                    ? "linear-gradient(45deg, #996600 0%, #ffbf00 100%)"
                : type === "flying"
                    ? "linear-gradient(45deg, silver 0%, #00ffff 100%)"
                : type === "psychic"
                    ? "linear-gradient(45deg, #ff00ff 0%, #f7a7f7 100%)"
                : type === "fighting"
                    ? "linear-gradient(45deg, #c8681a 0%, #e2a16b 100%)"
                : type === "rock"
                    ? "linear-gradient(45deg, #404040 0%, #808080 100%)"
                : type === "ghost"
                    ? "linear-gradient(45deg, #800080 0%, #630063 100%)"
                : type === "dragon"
                    ? "linear-gradient(45deg, #ff8f34 0%, #00eeff 100%)"
                : type === "dark"
                    ? "linear-gradient(45deg, #000000 0%, #404040 100%)"
                : type === "steel"
                    ? "linear-gradient(45deg, #808080 0%, #c0c0c0 100%)"
                : type === "fairy"
                    ? "linear-gradient(45deg, #ff5fa9 0%, #ff99ff 100%)"
                : "white",
            }}
        />
    )
}

export {CardBackground}
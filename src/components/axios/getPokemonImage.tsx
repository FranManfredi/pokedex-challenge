

export const getPokemonImage = (pokemonNum: number) => {
    return pokemonNum > 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNum}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonNum}.gif`;
}
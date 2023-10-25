import { useState, useEffect } from 'react';

const getPokemonImage = (pokemonNum: number) => {
    return pokemonNum > 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNum}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonNum}.gif`;
}

export const usePokemonImage = (pokemonNum: number) => {
    const [pokemonImage, setPokemonImage] = useState("");
  
    useEffect(() => {
      const fetchPokemonImage = async () => {
        try {
          const imageUrl = getPokemonImage(pokemonNum);
          const response = await fetch(imageUrl);
  
          if (response.ok) {
            const blob = await response.blob();
            setPokemonImage(URL.createObjectURL(blob));
          } else {
            console.error('Error al cargar la imagen del Pokémon');
          }
        } catch (error) {
          console.error('Error al cargar la imagen del Pokémon', error);
        }
      };
  
      fetchPokemonImage();
  
    }, [pokemonNum]);
  
    return pokemonImage;
  };
  
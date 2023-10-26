import axios from "axios";
import { useEffect, useState } from "react";

export interface AdvancePokemon {
  pokemonNum: number;
  pokemonName: string;
  pokemonTypes: string[];
  pokemonWeaknes: string[];
  pokemonEvolutionLine: PokemonEvolLine[][];
}

export interface PokemonEvolLine {
  id: number;
  name: string;
  type: string[];
}

export interface PokemonEvolLine {
  id: number;
  name: string;
  type: string[];
}

interface PokemonSpeciesData {
  evolution_chain: {
    url: string;
  };
}

interface EvolutionChain {
  chain: {
    species: {
      name: string;
    };
    evolves_to: NextEvolutionChain[];
  };
}

interface NextEvolutionChain {
  species: {
    name: string;
  };
  evolves_to: NextEvolutionChain[];
}

const typeWeaknesses: Record<string, string[]> = {
  normal: ['fighting'],
  fire: ['water', 'rock', 'ground'],
  water: ['electric', 'grass'],
  electric: ['ground'],
  grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
  ice: ['fire', 'fighting', 'rock', 'steel'],
  fighting: ['flying', 'psychic', 'fairy'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'ice', 'grass'],
  flying: ['electric', 'ice', 'rock'],
  psychic: ['bug', 'ghost', 'dark'],
  bug: ['fire', 'flying', 'rock'],
  rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
  ghost: ['ghost', 'dark'],
  dragon: ['ice', 'dragon', 'fairy'],
  dark: ['fighting', 'bug', 'fairy'],
  steel: ['fire', 'fighting', 'ground'],
  fairy: ['poison', 'steel'],
};

const getWeaknessesOf = (types: string[]): string[] => {
  const weaknesses: string[] = [];
  types.forEach((type) => {
    const typeWeakness = typeWeaknesses[type];
    if (typeWeakness) {
      typeWeakness.forEach((weakness) => {
        if (!weaknesses.includes(weakness)) {
          weaknesses.push(weakness);
        }
      });
    }
  });
  return weaknesses;
};

const traverseChain = (chain: EvolutionChain, evolutionLineNames: { name: string }[][]) => {
  const stage: { name: string } = {
    name: chain.chain.species.name,
  };
  if (chain.chain.evolves_to.length > 0) {
    evolutionLineNames.push([stage]);
    chain.chain.evolves_to.forEach((nextStage: NextEvolutionChain) => {
      traverseNextChain(nextStage, evolutionLineNames);
    });
  } else {
    evolutionLineNames[evolutionLineNames.length - 1].push(stage);
  }
};

const traverseNextChain = (nextStage: NextEvolutionChain, evolutionLineNames: { name: string }[][]) => {
  const stage: { name: string } = {
    name: nextStage.species.name,
  };
  if (nextStage.evolves_to.length > 0) {
    evolutionLineNames.push([stage]);
    nextStage.evolves_to.forEach((nextStage: NextEvolutionChain) => {
      traverseNextChain(nextStage, evolutionLineNames);
    });
  } else {
    evolutionLineNames.push([stage]);
  }
};

const getEvolutionLine = async (pokemonSpeciesData: PokemonSpeciesData): Promise<PokemonEvolLine[][]> => {
  const evolutionChainData = await axios.get<EvolutionChain>(pokemonSpeciesData.evolution_chain.url);
  const evolutionLineNames: { name: string }[][] = [];

  traverseChain(evolutionChainData.data, evolutionLineNames);

  const pokemonEvoLinePromises = evolutionLineNames.map(async (array) => {
    return Promise.all(
      array.map(async (name) => {
        const pokemon = await axios.get<any>(`https://pokeapi.co/api/v2/pokemon/${name.name}`);
        const id: number = pokemon.data.id;
        const type: string[] = pokemon.data.types.map((typeData: any) => typeData.type.name);

        return {
          name: name.name,
          id: id,
          type: type,
        };
      })
    );
  });

  const pokemonEvoLine = await Promise.all(pokemonEvoLinePromises);

  return pokemonEvoLine;
};

const useGetAdvancedPokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<AdvancePokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await axios.get<any>(url);
        const pokemonData = response.data;
        
        const pokemonNum: number = pokemonData.id;
        const pokemonName: string = pokemonData.name;
        const pokemonTypes: string[] = pokemonData.types.map((typeData: any) => typeData.type.name);
        
        const pokemonSpeciesUrl = pokemonData.species.url;
        const speciesResponse = await axios.get<PokemonSpeciesData>(pokemonSpeciesUrl);
        const pokemonWeaknesses: string[] = getWeaknessesOf(pokemonTypes);
        
        const pokemonEvolutionLine: PokemonEvolLine[][] = await getEvolutionLine(speciesResponse.data);

        const advancedPokemon: AdvancePokemon = {
          pokemonNum,
          pokemonName,
          pokemonTypes,
          pokemonWeaknes: pokemonWeaknesses,
          pokemonEvolutionLine,
        };

        setPokemon(advancedPokemon);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching advanced Pokémon:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { pokemon, isLoading };
};

export { useGetAdvancedPokemon };
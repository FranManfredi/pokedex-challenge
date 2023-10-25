import axios from "axios";

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

interface PokemonSpeciesData {
  data: {
    evolution_chain: {
      url: string;
    };
  };
}

interface EvolutionChain {
  chain: {
    species: {
      name: string;
    };
    evolves_to: EvolutionChain[];
  };
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

const traverseChain = (chain: EvolutionChain) => {
  const evolutionLineNames: { name: string }[][] = [];
  const stage: { name: string } = {
    name: chain.chain.species.name,
  };
  if (chain.chain.evolves_to.length > 0) {
    evolutionLineNames.push([stage]);
    chain.chain.evolves_to.forEach((nextStage: EvolutionChain) => {
      traverseNextChain(nextStage, evolutionLineNames);
    });
  } else {
    evolutionLineNames[evolutionLineNames.length - 1].push(stage);
  }
};

const traverseNextChain = (nextStage: EvolutionChain, evolutionLineNames: { name: string }[][]) => {
  const stage: { name: string } = {
    name: nextStage.chain.species.name,
  };
  if (nextStage.chain.evolves_to.length > 0) {
    evolutionLineNames.push([stage]);
    nextStage.chain.evolves_to.forEach((nextStage: EvolutionChain) => {
      traverseNextChain(nextStage, evolutionLineNames);
    });
  } else {
    evolutionLineNames.push([stage]);
  }
};

const getEvolutionLine = async (pokemonSpeciesData: PokemonSpeciesData): Promise<PokemonEvolLine[][]> => {
  const evolutionChainData = await axios.get<EvolutionChain>(pokemonSpeciesData.data.evolution_chain.url);
  const evolutionLineNames: { name: string }[][] = [];

  traverseChain(evolutionChainData.data);

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

const getAdvancedPokemon = async (id: string): Promise<AdvancePokemon> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await axios.get<any>(url);

  const pokemonNum: number = pokemon.data.id;
  const pokemonName: string = pokemon.data.name;
  const pokemonTypes: string[] = pokemon.data.types.map((typeData: any) => typeData.type.name);
  const pokemonWeaknes: string[] = getWeaknessesOf(pokemonTypes);
  const pokemonEvolutionLine: PokemonEvolLine[][] = await getEvolutionLine(
    (await axios.get<PokemonSpeciesData>(pokemon.data.species.url)).data
  );

  return {
    pokemonNum,
    pokemonName,
    pokemonTypes,
    pokemonWeaknes,
    pokemonEvolutionLine,
  };
};

export { getAdvancedPokemon };
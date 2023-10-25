import axios from "axios";

export interface AdvancePokemon {
  pokemonNum: number
  pokemonName: string
  pokemonTypes: string[]
  pokemonWeaknes: string[]
  pokemonEvolutionLine: PokemonEvolLine[][]
}

export interface PokemonEvolLine {
  id: number,
  name: string,
  type: string[]
}

const typeWeaknesses: Record<string, string[]> = {
  normal: ['fighting'],
  fire: ['water', 'rock', 'ground'],
  // ... (rest of the type weaknesses)
  fairy: ['poison', 'steel'],
};

const getWeaknessesOf = (types: string[]): string[] => {
  console.log(types);
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

const getEvolutionLine = async (pokemonSpeciesData: { data: any }): Promise<PokemonEvolLine[][]> => {
  const evolutionChainData = await axios.get(pokemonSpeciesData.data.evolution_chain.url);
  const evolutionLineNames: { name: string }[][] = [];

  const traverseChain = (chain: any) => {
    const stage: { name: string } = {
      name: chain.chain.species.name,
    };
    if (chain.chain.evolves_to.length > 0) {
      evolutionLineNames.push([stage]);
      chain.chain.evolves_to.forEach((nextStage: any) => {
        traverseNextChain(nextStage);
      });
    } else {
      evolutionLineNames[evolutionLineNames.length - 1].push(stage);
    }
  };

  const traverseNextChain = (nextStage: any) => {
    const stage: { name: string } = {
      name: nextStage.species.name,
    };
    if (nextStage.evolves_to.length > 0) {
      evolutionLineNames.push([stage]);
      nextStage.evolves_to.forEach((nextStage: any) => {
        traverseNextChain(nextStage);
      });
    } else {
      evolutionLineNames.push([stage]);
    }
  };

  traverseChain(evolutionChainData.data);

  const pokemonEvoLinePromises = evolutionLineNames.map(async (array) => {
    return Promise.all(
      array.map(async (name) => {
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.name}`);
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
  const pokemon = await axios.get(url);

  const pokemonNum: number = pokemon.data.id;
  const pokemonName: string = pokemon.data.name;
  const pokemonTypes: string[] = pokemon.data.types.map((typeData: any) => typeData.type.name);
  const pokemonWeaknes: string[] = getWeaknessesOf(pokemonTypes);
  console.log(pokemonWeaknes);
  const pokemonEvolutionLine: PokemonEvolLine[][] = await getEvolutionLine(await axios.get(pokemon.data.species.url));

  return {
    pokemonNum,
    pokemonName,
    pokemonTypes,
    pokemonWeaknes,
    pokemonEvolutionLine,
  };
};

export { getAdvancedPokemon };
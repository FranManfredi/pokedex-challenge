import axios from "axios";

export interface AdvancePokemon{
    pokemonNum: number
    pokemonName : string
    pokemonTypes : string[]
    pokemonWeaknes : string[]
    pokemonEvolutionLine : PokemonEvolLine[][]
}

export interface PokemonEvolLine{
    id:number, 
    name:string, 
    type:string[]
}

export default async function getAdvancedPokemon( id:string): Promise<AdvancePokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemon = await axios.get(url)

    const pokemonNum: number = pokemon.data.id;
    const pokemonName: string = pokemon.data.name;
    const pokemonTypes: string[] = pokemon.data.types.map((typeData : any) => typeData.type.name);
    const pokemonWeaknes: string[] = getWeaknessesOf(pokemonTypes);
    const pokemonEvolutionLine : PokemonEvolLine[][] = await getEvolutionLine(await axios.get(pokemon.data.species.url));

    return({
        pokemonNum,
        pokemonName,
        pokemonTypes,
        pokemonWeaknes,
        pokemonEvolutionLine
    })
}

const typeWeaknesses: Record<string, string[]> = {
    Normal: ['Fighting'],
    Fire: ['Water', 'Rock', 'Ground'],
    Water: ['Electric', 'Grass'],
    Electric: ['Ground'],
    Grass: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
    Ice: ['Fire', 'Fighting', 'Rock', 'Steel'],
    Fighting: ['Flying', 'Psychic', 'Fairy'],
    Poison: ['Ground', 'Psychic'],
    Ground: ['Water', 'Ice', 'Grass'],
    Flying: ['Electric', 'Ice', 'Rock'],
    Psychic: ['Bug', 'Ghost', 'Dark'],
    Bug: ['Fire', 'Flying', 'Rock'],
    Rock: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'],
    Ghost: ['Ghost', 'Dark'],
    Dark: ['Fighting', 'Bug', 'Fairy'],
    Steel: ['Fire', 'Fighting', 'Ground'],
    Dragon: ['Ice', 'Dragon', 'Fairy'],
    Fairy: ['Poison', 'Steel'],
};
  

function getWeaknessesOf(types: string[]): string[] {
    const weaknesses = new Set<string>();
  
    types.forEach((type) => {
      const typeWeakness = typeWeaknesses[type];
      if (typeWeakness) {
        typeWeakness.forEach((weakness) => {
          weaknesses.add(weakness);
        });
      }
    });
  
    return Array.from(weaknesses);
}

async function getEvolutionLine(pokemonSpeciesData: { data: any }) : Promise<PokemonEvolLine[][]> {
    const evolutionChainData = await axios.get(pokemonSpeciesData.data.evolution_chain.url);
    const evolutionLineNames: { name: string}[][] = [];
  
    function traverseChain(chain: any) {
        const stage : {name: string} = {
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
    }

    function traverseNextChain(nextStage: any){
        const stage : {name: string} = {
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
    }
    
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

        return pokemonEvoLine

}
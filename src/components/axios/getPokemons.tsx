import axios from "axios";

export interface Pokemon {
    pokemonNum : number
    pokemonName : string
    pokemonTypes : string[]
} 

let offset = 0;

const getPokemons = async () =>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
    const pokemons = await axios.get(url)
    const pokemones = await Promise.all(
        pokemons.data.results.map( async (data: { url: string; name : string;})  => {
        const pokeInfo : { data : {id : number; types : [type : [name : string]]} } = await axios.get(data.url)
        const types = pokeInfo.data.types.map((typeData : any) => typeData.type.name);
        return ( 
            {
                pokemonName: data.name,
                pokemonNum: pokeInfo.data.id,
                pokemonTypes: types
            }
        )
    })) 
    offset += 20
    return pokemones
}

export { getPokemons }
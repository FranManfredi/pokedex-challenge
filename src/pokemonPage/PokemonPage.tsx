import { useParams } from "react-router-dom"
import getAdvancedPokemon, { AdvancePokemon } from "../components/axios/getAdvacedPokemon"
import { useEffect, useState } from "react";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import './PokemonPage.css'
import { PokemonType } from "../components/pokemonType/pokemonType";

export default function PokemonPage(){
    const {id} = useParams<{id?: string}>();
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<AdvancePokemon>();

    var url = ''

    const pokeNum = pokemon?.pokemonNum ?? 0

    if (pokeNum > 649){
        url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNum}.png`
      }
      else url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokeNum}.gif`;

    useEffect(() => {
        getAdvancedPokemon(id ?? '').then((data) => {
          setPokemon(data);
          setIsLoading(false);
        });
      }, []);

      if(isLoading){
        return <LoadingScreen/>
      }

    return(
        <div id="PokemonPage">
            <div className="pageContent">
                <div className="inner-up">
                    <div className="pokeFrame">
                        <img src={url} alt="" />
                    </div>
                    <div className="up-right">
                        <div className="pokeTypes">
                            
                        </div>
                        <div className="pokeWeakness"></div>
                    </div>
                </div>
                <div className="pokemonEvolLine"></div>
            </div>
            
            
        </div>
    )
}


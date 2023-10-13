import Atropos from 'atropos/react';
import './pokecard.css';
import 'atropos/atropos.css';

import {PokemonType} from '../pokemonType/pokemonType';

function PokeCard({width, height, pokemon} :any){
    return ( 
    <div className="card" style={{width, height}}>
      <div className="card-header" >
        <Atropos>
          <div className='card-background'/> {/* background */}
          <div className='card-in-between' data-atropos-offset="2" /> {/* card and content in-between*/}
          <h1 className='card-title' data-atropos-offset="1" >Blastoise</h1> {/* title */}
          <img className='card-image' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif" data-atropos-offset="2" alt='pokemon' /> {/* image */}
          <PokemonType types={["water", "fire"]} /> {/* type */}
        </Atropos>
      </div>
    </div>)
  }
  
  export {PokeCard}
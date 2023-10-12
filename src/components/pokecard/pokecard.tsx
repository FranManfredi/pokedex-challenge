import Atropos from 'atropos/react';
import './pokecard.css';
import 'atropos/atropos.css';

import {PokemonType} from '../pokemonType/pokemonType';

function PokeCard({width, height, pokemon} :any){
    return ( 
    <div className="card" style={{width, height}}>
      <div className="card-header" >
        <Atropos>
          <div className='card-background'></div> {/* background */}
          <div className='card-in-between' data-atropos-offset="2" ></div> {/* card and content in-between*/}
          <h1 className='card-title' data-atropos-offset="1" >Blastoise</h1> {/* title */}
          <img className='card-image' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/640.gif" data-atropos-offset="2" alt='pokemon' /> {/* image */}
          <div style={{display: 'flex', flexWrap: 'wrap', gap: "10%", zIndex: 3,position: 'absolute', top: "55%",left: "10%", width: "80%", height: "30%"}} data-atropos-offset="2" >
            <PokemonType type="water" />
            <PokemonType type="water" />
          </div> {/* stats */}
          <div className='pokemon-types' ></div>
        </Atropos>
      </div>
    </div>)
  }
  
  export {PokeCard}
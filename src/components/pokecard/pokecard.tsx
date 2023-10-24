import Atropos from 'atropos/react';
import './pokecard.css';
import 'atropos/atropos.css';
import { PokemonType } from '../pokemonType/pokemonType';

function PokeCard({ width, height, pokemonNum, pokemonName, pokemonTypes }: any) {
  var url = ""

  if (pokemonNum > 649) {
    url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNum}.png`
  }
  else url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonNum}.gif`;

  return (
    <div className="card" style={{ width, height, minHeight: height, minWidth: width }}>
      <div className="card-header" >
        <Atropos>
          <div className={`card-background card-background-${pokemonTypes[0]}`} data-atropos-offset="2" >
            <div className='card-in-between' data-atropos-offset="2">
              <h1 className='card-title' data-atropos-offset="1" >{pokemonName}</h1> {/* title */}
              <h2 className='card-number' data-atropos-offset="1" >#{String(pokemonNum).padStart(4, '0')}</h2> {/* subtitle */}
              <img className='card-image' src={url} data-atropos-offset="2" alt='pokemon' /> {/* image */}
              <PokemonType types={pokemonTypes} /> {/* type */}
            </div>
          </div>
        </Atropos>
      </div>
    </div>)
}

export { PokeCard }
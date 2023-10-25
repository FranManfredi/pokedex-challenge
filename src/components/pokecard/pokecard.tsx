import Atropos from 'atropos/react';
import './pokecard.css';
import 'atropos/atropos.css';
import { Link } from 'react-router-dom'; // Import Link
import { PokemonType } from '../pokemonType/pokemonType';
import { getPokemonImage } from '../axios/getPokemonImage';

export const PokeCard = ({ width, height, pokemonNum, pokemonName, pokemonTypes }: any) => (
  <Link to={`/${pokemonNum}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="card" style={{ width, height, minHeight: height, minWidth: width }}>
      <div className="card-header">
        <Atropos>
          <div className={`card-background card-background-${pokemonTypes[0]}`} data-atropos-offset="2">
            <div className='card-in-between' data-atropos-offset="2">
              <h1 className='card-title' data-atropos-offset="1">{pokemonName}</h1>
              <h2 className='card-number' data-atropos-offset="1">#{String(pokemonNum).padStart(4, '0')}</h2>
              <img className='card-image' src={getPokemonImage(pokemonNum)} data-atropos-offset="2" alt='pokemon' />
              <PokemonType types={pokemonTypes} />
            </div>
          </div>
        </Atropos>
      </div>
    </div>
  </Link>
);
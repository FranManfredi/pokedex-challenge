import './App.css';
import { PokeCard } from './components/pokecard/pokecard';

export default function App () {
  const pokemon = {}; // Replace with the actual pokemon object
  return (
    <div id="app">
      <div className="container">
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 5, height: 0, width: '100%'}}>
          <PokeCard pokemon = {pokemon} width={320} height={480}/>
        </div>
      </div>
    </div>
  )
}


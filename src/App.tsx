import './App.css';
import { PokeCard } from './components/pokecard/pokecard';

export default function App () {
  return (
    <div id="app">
      <div className="container">
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 5, height: 0, width: '100%'}}>
          <PokeCard pokemonNum = {4} pokemonName={"Charizard"} pokemonTypes = {["fire"]} width={320} height={380}/>
          <PokeCard pokemonNum = {5} pokemonName={"Charmileon"} pokemonTypes = {["fire"]} width={320} height={380}/>
          <PokeCard pokemonNum = {6} pokemonName={"Charizard"} pokemonTypes = {["fire"]} width={320} height={380}/>
          <PokeCard pokemonNum = {460} pokemonName={"Abomasnow"} pokemonTypes = {["grass", "ice"]} width={320} height={380}/>
        </div>
      </div>
    </div>
  )
}


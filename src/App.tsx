import Atropos from 'atropos/react';
import 'atropos/atropos.css';
import './App.css';

export default function App () {
  const pokemon = {}; // Replace with the actual pokemon object
  return (
    <div id="app">
      <div className="container">
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 5, height: 0, width: '100%'}}>
          <PokeCard pokemon = {pokemon} width={160} height={240}/>
          <PokeCard pokemon = {pokemon} width={160} height={240}/>
          <PokeCard pokemon = {pokemon} width={160} height={240}/>
          <PokeCard pokemon = {pokemon} width={160} height={240}/>
          <PokeCard pokemon = {pokemon} width={160} height={240}/>
          <PokeCard pokemon = {pokemon} width={160} height={240}/>
          <PokeCard pokemon = {pokemon} width={160} height={240}/>
        </div>
      </div>
    </div>
  )
}

function PokeCard({width, height, pokemon} :any){
  return ( 
  <div className="card" style={{width, height}}>
    <div className="card-header" >
      <Atropos>
        <div style={{width: "100%", height: "100%", background: "linear-gradient(45deg, #ADD8E6, #009fd4)", zIndex: 0}}></div> {/* background */}
        <div style={{width: "92%", height: "93%", background: "white", position: 'absolute', top: "4%" , left: "4%", zIndex: 1, opacity: "75%"}} data-atropos-offset="2" ></div> {/* card and content in-between*/}
        <h1 style={{width: "90%", position: 'absolute', top: '0%', left: '5%', fontSize: '100%', objectFit: 'contain', textAlign: 'center', textJustify: 'auto', zIndex: 2}} data-atropos-offset="1" >Sample Text</h1> {/* title */}
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif" style={{width: "90%", height: "35%",objectFit: 'contain', position: 'absolute', top: "18%" , left: "5%", zIndex: 2}} data-atropos-offset="2" alt='pokemon' /> {/* image */}
        <div className='pokemon-types' ></div>
      </Atropos>
    </div>
  </div>)
}

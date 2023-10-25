import {BrowserRouter, Route, Routes} from "react-router-dom"
import PokemonHome from './PokemonHome'
import PokemonPage from './pokemonPage/PokemonPage'


const App = () => (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PokemonHome />} />
          <Route path='/:id' element={<PokemonPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
  
  export default App;
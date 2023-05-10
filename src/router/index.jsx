import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { Profile } from "../pages/Profile"; 
import { Team } from "../pages/Team"; 
 
import { useState } from "react" 
import { Home } from "../pages/Home"

export const Router = () => { 
  const [pokemonData, setPokemonData] = useState(); 

  return ( 

      <BrowserRouter> 
        <Routes> 
          <Route path="/" element={<Home setPokemonData={setPokemonData} />} /> 
          <Route path="/profile" element={<Profile pokemonData={pokemonData} />} /> 
          <Route path="/team" element={<Team setPokemonData={pokemonData} />} /> 
        </Routes> 
      </BrowserRouter> 
   
  ); 
} 

export default Home;

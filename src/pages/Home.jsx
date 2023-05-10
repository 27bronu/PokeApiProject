import { Box, Grid, Button, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import PokeCard from "../components/PokeCard";
import { Skeletons } from "../components/Skeletons";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, [currentPage]);

  const getPokemons = () => {
    const limit = 21;
    const offset = (currentPage - 1) * limit;
    const url = "https://pokeapi.co/api/v2/pokemon";
    axios
      .get(url, {
        params: {
          limit: limit,
          offset: offset,
        },
      })
      .then((res) => {
        const results = res.data.results;
        const promises = results.map((result) => axios.get(result.url));
        axios.all(promises).then((responses) => {
          const pokemonData = responses.map((response) => response.data);
          setPokemons(pokemonData);
        });
      });
  };

  const pokemonFilter = (name) => {
    if (name === "") {
      getPokemons();
    } else {
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      axios.get(url).then((res) => setPokemons([res.data]));
    }
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile", { state: { pokemonData } });
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <NavBar pokemonFilter={pokemonFilter} />
      <Container maxWidth={false}>
        <Grid container spacing={10}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={key}>
                <Box onClick={() => pokemonPickHandler(pokemon)}>
                  <PokeCard
                    name={pokemon.name}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    types={pokemon.types}
                    id={pokemon.id}
                  />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
        <Box mt={5} display="flex" justifyContent="center">
          <IconButton disabled={currentPage === 1} onClick={handlePrevPage}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleNextPage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>
    </div>
  );
};

import { Chip, Container, Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import IconButton from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import PokeTable from "../components/PokeTable";
import axios from "axios";


export const Profile = ({ pokemonData }) => {
  const { name, sprites, moves } = pokemonData || {};
  const navigate = useNavigate();


  const handleChange = (event) => {
    pokemonData(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${handleChange}`)
      .then((response) => {
        pokemonData(response.name);
        console.log(pokemonData);
      });
    if (!pokemonData) {
      navigate("/");
    }
  }, []);

  if (!pokemonData) {
    return null;
  }

  return (
    <>
      <Navbar hideSearch />
      <Container maxWidth="md">
        <Paper elevation={6}>
          <Box display="flex" flexDirection="column" alignItems="center" p={5}>
            <Typography variant="h4">{name}</Typography>
            <p></p>
            <Stack direction="row" spacing={2}>
            </Stack>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              marginBottom="15px"
              sx={{
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
              }}
            >
              <Box
                component="img"
                src={sprites.front_default}
                width="50%"
                height="100%"
              />
              <PokeTable pokemonData={pokemonData} />
            </Box>
            <Box width="100%">
              <Divider>Variations</Divider>

              <Box display="flex" justifyContent="space-between">
                <Box
                  component="img"
                  src={sprites.front_female}
                  width="25%"
                  height="25%"
                />
                <Box
                  component="img"
                  src={sprites.front_shiny}
                  width="25%"
                  height="25%"
                />
                <Box
                  component="img"
                  src={sprites.front_shiny_female}
                  width="25%"
                  height="25%"
                />
              </Box>
              <Divider>Atacks</Divider>
              <Box textAlign="center" marginTop="15px">
                {moves.map((moveData, key) => (
                  <Chip
                    key={key}
                    sx={{ m: "5px" }}
                    label={moveData.move.name}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
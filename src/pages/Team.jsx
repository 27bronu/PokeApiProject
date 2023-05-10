import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const Team = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [listItems, setListItems] = useState(() => {
    const items = localStorage.getItem("listItems");
    return items ? JSON.parse(items) : [];
  });
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleAdd = () => {
    if (!selectedPokemon) {
      return;
    }
    if (listItems.length >= 6) {
      return;
    }
    const newListItems = [...listItems];
    newListItems.push({
      id: newListItems.length + 1,
      pokemon: selectedPokemon,
    });
    setListItems(newListItems);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1015")
      .then((response) => {
        setPokemonData(response.data.results);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);

  return (
    <div>
      <Navbar hideSearch />
      <Typography variant="h4" align="center" sx={{ mt: 2, mb: 4 }}>
        A minha Equipa
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={pokemonData}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Escolha um Pokemon" />
          )}
          onChange={(event, newValue) => {
            if (newValue) {
              axios.get(newValue.url).then((response) => {
                setSelectedPokemon(response.data);
              });
            } else {
              setSelectedPokemon(null);
            }
          }}
          disabled={listItems.length >= 6}
        />
        <IconButton aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          mx: "auto",
        }}
      >
        {listItems.map((item) => (
          <div key={item.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={item.pokemon?.sprites.front_default}>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.pokemon?.name} />
              <IconButton
                aria-label="delete"
                onClick={() => {
                  const newListItems = listItems.filter(
                    (listItem) => listItem.id !== item.id
                  );
                  setListItems(newListItems);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};

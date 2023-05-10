import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { typeHandler } from "../../utils";

export default function PokeCard({ name, image, types, id }) {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia component="img" height="400" image={image} alt="green iguana" />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div">
              {name + `‎ #${id}` }
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              {typeHandler(types)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

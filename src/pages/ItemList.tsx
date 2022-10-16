import { Stack } from "@mui/system";
import { Button, Box, Divider } from "@mui/material";
import "./ItemList.css";
import SimpleItem from "../components/SimpleItem";
import ButtonItem from "../components/ButtonItem";

export const ItemList = (): React.ReactElement => {
  return (
    <div className="home">
      <Box sx={{ alignContent: "flex-start" }}>
        <Button href="/">Retour</Button>
      </Box>
      <Box sx={{ my: 3, mx: 2 }}>
        <h1>Intitulé</h1>
      </Box>
      <Divider orientation="horizontal" />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ my: 3, mx: 2 }}
      >
        <SimpleItem />
        <ButtonItem />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
        width="100%"
        style={{ position: "fixed", bottom: "0" }}
      >
        <Button href="/">Accueil</Button>
        <Button href="/advanced-search">Recherche Avancée</Button>
        <Button href="/">Catalogue</Button>
      </Stack>
    </div>
  );
};

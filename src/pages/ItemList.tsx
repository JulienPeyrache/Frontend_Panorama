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
      <Box sx={{ my: 1, mx: 1 }}>
        <h1>Intitulé</h1>
      </Box>
      <Divider orientation="horizontal" />
      <Stack
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
        sx={{ my: 1, mx: 1 }}
      >
        <SimpleItem />
        <ButtonItem />
      </Stack>
    </div>
  );
};

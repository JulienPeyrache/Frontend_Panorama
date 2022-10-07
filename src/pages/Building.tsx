import "./Building.css";
import { Box, Button } from "@mui/material";
import ServiceItem from "../components/ServiceItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BuildingList from "../pages/BuildingList";
import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CourseButtons from "../components/CourseButtons";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#cfda49",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#26367a",
    },
  },
});

interface BuildingInfo {
  id: number;
}

interface BuildingData {
  id?: number;
  address?: string;
  name_building?: string;
  postal_code?: number;
  typology_building?: string;
}

export const Building = (): React.ReactElement => {
  const id = useParams();
  const url = "http://localhost:3000/api/building/" + id;
  const [data, setData] = useState<BuildingData>();
  const getData = async () => {
    const { data } = await axios.get<BuildingData>(url);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="building">
      <h1>Recherche</h1>
      <h2> {data?.name_building} </h2>
      <p> Description du bâtiment (horaires) </p>
      <h3>Services Disponibles:</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: "20px",
        }}
      >
        <ServiceItem
          name="Accueil Physique"
          info="L'accueil est présent au RDC devant l'entrée principale du bâtiment"
          type="Accueil"
        />
        <ServiceItem name="Parking privé" info="150 places" type="Parking" />
        <ServiceItem
          name="WiFi"
          info="Vous pouvez récupérer votre code d'accès WiFi à l'accueil lors de votre arrivée sur le site."
          type="WiFi"
        />
        <ServiceItem name="Chez Gusteau" info="12:00-14:00" type="Restaurant" />
        <ServiceItem name="Café Gusto" info="14:00-17:00" type="Cafe" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          flexWrap: "nowrap",
          rowGap: "20px",
          columnGap: "20px",
        }}
      >
        <CourseButtons />
      </div>
      <Box textAlign="center">
        <Button href="/">Retour</Button>
      </Box>
    </div>
  );
};

import "./Building.css";
import { Box, Button } from "@mui/material";
import ServiceItem from "../components/ServiceItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CourseList from "../components/CourseList";
import { baseURL } from "../components/Const";

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
  id: number;
  name_building: string;
  address: string;
  postal_code: number;
  city: string;
  typology_building: string;
}

export const Building = (): React.ReactElement => {
  let { id } = useParams();
  const url = baseURL + "/api/building/" + id;
  const [data, setData] = useState<BuildingData>({
    id: -1,
    name_building: "Error",
    address: "Error",
    postal_code: -1,
    city: "Error",
    typology_building: "Error",
  });
  const getData = () => {
    axios.get<BuildingData>(url).then((data) => setData(data.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="building">
      <h1>Recherche</h1>
      <h2> {data.name_building} </h2>
      <h3>Services Disponibles:</h3>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            borderRadius: "16px",
            borderColor: "secondary.main",
            border: 3,
          }}
        >
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
            <ServiceItem
              name="Parking privé"
              info="150 places"
              type="Parking"
            />
            <ServiceItem
              name="WiFi"
              info="Vous pouvez récupérer votre code d'accès WiFi à l'accueil lors de votre arrivée sur le site."
              type="WiFi"
            />
            <ServiceItem
              name="Chez Gusteau"
              info="12:00-14:00"
              type="Restaurant"
            />
            <ServiceItem name="Café Gusto" info="14:00-17:00" type="Cafe" />
          </div>
        </Box>
      </ThemeProvider>
      <p></p>
      <CourseList id_building={data.id} />
      <Box textAlign="center">
        <Button href="/">Retour</Button>
      </Box>
    </div>
  );
};

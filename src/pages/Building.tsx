import './Building.css';
import { Box, Button, IconButton } from '@mui/material';
import ServiceItem from '../components/ServiceItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PauseCircleOutlineSharp } from '@mui/icons-material';

const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#cfda49',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      }
    },
  });

interface BuildingInfo {

    name:string;
    parcours:string[];

}

export const Building = ( props:BuildingInfo ) : React.ReactElement => {
      
    return (
        <div className="building">
        <h1>Recherche</h1>
        <h2> {props.name} </h2>
        <p> Description du bâtiment (horaires) </p>
        <h3>Services Disponibles:</h3>
        <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap", rowGap: '20px'}}>
            <ServiceItem name='Accueil Physique' info="L'accueil est présent au RDC devant l'entrée principale du bâtiment" type='Accueil'/>
            <ServiceItem name='Parking privé' info='150 places' type='Parking'/>
            <ServiceItem name='WiFi' info="Vous pouvez récupérer votre code d'accès WiFi à l'accueil lors de votre arrivée sur le site." type='WiFi'/>
            <ServiceItem name='Chez Gusteau' info='12:00-14:00' type='Restaurant'/>
            <ServiceItem name='Café Gusto' info='14:00-17:00' type='Cafe'/>
        </div>
        <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "column", flexWrap: "nowrap", rowGap: '20px', columnGap:'20px'}}>
            <ThemeProvider theme={theme}>
                { props.parcours.map( parcours => {
                    return (
                        <Button variant="contained" color="primary"> { parcours } </Button>
                    )
                }) }
            </ThemeProvider>
        </div>
        <Box textAlign='center'>
            <Button>Retour</Button>
        </Box>
        </div>
    )
    }
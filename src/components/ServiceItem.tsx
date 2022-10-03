import * as React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ServiceInfo {

    service: string;
    service_info: string;

}

interface PaletteColor {
    main: string;
}

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


export default function ServiceItem(props:ServiceInfo) {
    return(
        <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center", columnGap:"10px"}}>
                <ThemeProvider theme={theme}>
                    <RestaurantIcon color="primary" style={{height:60, width:60}} />
                </ThemeProvider>
                <p> {props.service} </p>
                <p> {props.service_info} </p>
                <IconButton aria-label="information" color="info"> <InfoIcon />
                </IconButton>
            </div>
    )
}
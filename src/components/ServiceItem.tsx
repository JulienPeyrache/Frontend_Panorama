import * as React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ServiceInfo {

    type: string;
    name: string;
    info: string;
    

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
    if (props.type == 'Restaurant')
    {
        return(
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center", columnGap:"10px"}}>
                <ThemeProvider theme={theme}>
                    <RestaurantIcon color="primary" style={{height:60, width:60}} />
                </ThemeProvider>
                <p> {props.name} </p>
                <p> {props.info} </p>
                <IconButton aria-label="information" color="info"> <InfoIcon />
                </IconButton>
                </div>
        )
    }
    if (props.type == 'Cafe')
    {
        return(
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center", columnGap:"10px"}}>
                <ThemeProvider theme={theme}>
                    <LocalCafeIcon color="primary" style={{height:60, width:60}} />
                </ThemeProvider>
                <p> {props.name} </p>
                <p> {props.info} </p>
                <IconButton aria-label="information" color="info"> <InfoIcon />
                </IconButton>
                </div>
        )
    }
    if (props.type == 'Parking')
    {
        return(
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center", columnGap:"10px"}}>
                <ThemeProvider theme={theme}>
                    <LocalParkingIcon color="primary" style={{height:60, width:60}} />
                </ThemeProvider>
                <p> {props.name} </p>
                <p> {props.info} </p>
                <IconButton aria-label="information" color="info"> <InfoIcon />
                </IconButton>
                </div>
        )
    }
    if (props.type == 'Accueil')
    {
        return(
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center", columnGap:"10px"}}>
                <ThemeProvider theme={theme}>
                    <InfoIcon color="primary" style={{height:60, width:60}} />
                </ThemeProvider>
                <p> {props.name} </p>
                <p> {props.info} </p>
                <IconButton aria-label="information" color="info"> <InfoIcon />
                </IconButton>
                </div>
        )
    }
    if (props.type == 'WiFi')
    {
        return(
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center", columnGap:"10px"}}>
                <ThemeProvider theme={theme}>
                    <WifiIcon color="primary" style={{height:60, width:60}} />
                </ThemeProvider>
                <p> {props.name} </p>
                <p> {props.info} </p>
                <IconButton aria-label="information" color="info"> <InfoIcon />
                </IconButton>
                </div>
        )
    }
    else
    {
        return (<div>empty</div>)
    }
}
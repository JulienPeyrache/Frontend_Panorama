import './Building.css';
import { Box, Button, IconButton } from '@mui/material';
import ServiceItem from '../components/ServiceItem';

export const Building = () : React.ReactElement => {
    const building_name:string = "Bâtiment Paris Pernet";
      
    return (
        <div className="building">
        <h1>Recherche</h1>
        <h2> {building_name} </h2>
        <p> Description du bâtiment (horaires) </p>
        <h3>Services Disponibles:</h3>
        <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap", rowGap: '20px'}}>
            <ServiceItem service='Restaurant' service_info='12:00-14:00'/>
            <ServiceItem service='Restaurant' service_info='12:00-14:00'/>
            <ServiceItem service='Restaurant' service_info='12:00-14:00'/>
            <ServiceItem service='Restaurant' service_info='12:00-14:00'/>
            <ServiceItem service='Restaurant' service_info='12:00-14:00'/>
        </div>
        <Box textAlign='center'>
            <Button>Retour</Button>
        </Box>
        </div>
    )
    }
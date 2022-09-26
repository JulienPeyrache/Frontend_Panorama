import './Building.css';
import restaurant from '../assets/restaurant.png';
import { Button } from '@mui/material';

export const Building = () : React.ReactElement => {
    const building_name:string = "Bâtiment Paris Pernet"
    return (
        <div className="building">
        <h1>Recherche</h1>
        <h2> {building_name} </h2>
        <p> Description du bâtiment (horaires) </p>
        <h3>Services Disponibles:</h3>
        <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap", rowGap: '20px'}}>
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center"}}>
                <img className='logoService' src={restaurant} alt="Logo Service" style={{height:60, width:60}}></img>
                <p> Restaurant: </p>
                <p> 12:00-14:00 </p>
                <Button variant='contained' sx={{fontSize: 8}}> Informations </Button>
            </div>
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center"}}>
                <img className='logoService' src={restaurant} alt="Logo Service" style={{height:60, width:60}}></img>
                <p> Restaurant: </p>
                <p> 12:00-14:00 </p>
                <Button variant='contained' sx={{fontSize: 8}}> Informations </Button>
            </div>
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center"}}>
                <img className='logoService' src={restaurant} alt="Logo Service" style={{height:60, width:60}}></img>
                <p> Restaurant: </p>
                <p> 12:00-14:00 </p>
                <Button variant='contained' sx={{fontSize: 8}}> Informations </Button>
            </div>
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center"}}>
                <img className='logoService' src={restaurant} alt="Logo Service" style={{height:60, width:60}}></img>
                <p> Restaurant: </p>
                <p> 12:00-14:00 </p>
                <Button variant='contained' sx={{fontSize: 8}}> Informations </Button>
            </div>
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"row", alignItems:"center"}}>
                <img className='logoService' src={restaurant} alt="Logo Service" style={{height:60, width:60}}></img>
                <p> Restaurant: </p>
                <p> 12:00-14:00 </p>
                <Button variant='contained' sx={{fontSize: 8}}> Informations </Button>
            </div>
        </div>
        </div>
    )
    }
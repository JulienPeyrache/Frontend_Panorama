import './Building.css';
import logo from '../assets/logo_macif.png';

export const Building = () : React.ReactElement => {
    const building_name:string = "Bâtiment Paris Pernet"
    return (
        <div className="building">
        <h1>Recherche</h1>
        <h2> {building_name} </h2>
        <div className="flex-container">

        </div>
        </div>
    )
    }
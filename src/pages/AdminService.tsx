import { Stack } from "@mui/system"
import FilterBar from "../components/FilterBar"
// import { Button } from "@mui/material"
import logo from "../assets/logo_macif.png"
import "./AdminService.css"

export const AdminService = (): React.ReactElement => {
    return (
        <div className="home">
            <h1>Gestion des services</h1>
            <img className="logo" src={logo} alt="Logo MACIF" />
            <Stack className="stack">
                <FilterBar label="Ville" />
                <FilterBar label="Bâtiment" />
                <FilterBar label="Type de service" />
                <FilterBar label="Service" />
                <FilterBar label="Service" />
                <FilterBar label="Service" />
                <FilterBar label="Service" />
                <FilterBar label="Service" />
            </Stack>
        </div>
    )
}
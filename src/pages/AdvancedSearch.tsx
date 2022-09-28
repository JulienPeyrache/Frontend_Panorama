import { Stack } from "@mui/system"
import FilterBar from "../components/FilterBar"
import { Button } from "@mui/material"
import logo from "../assets/logo_macif.png"
import "./AdvancedSearch.css"
import { listChamps, listChampsFilterBar } from "../components/Const"

export const AdvancedSearch = (): React.ReactElement => {
    return (
        <div className="home">
            <h1>Recherche avancée</h1>
            <img className="logo" src={logo} alt="Logo MACIF" />
            <Stack className="stack">
                {listChampsFilterBar}
            </Stack>
            <div className="search">
                <Button sx={{ marginBottom: '4%' }} variant='contained'>Rechercher</Button>
                <text id="return"><u><a href='/'>Retour</a></u></text>
            </div>
        </div>
    )
}
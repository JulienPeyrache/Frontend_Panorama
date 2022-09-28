import { Stack } from "@mui/system"
import FilterBar from "../components/FilterBar"
// import { Button } from "@mui/material"
import logo from "../assets/logo_macif.png"
import "./AdminService.css"
import { useState } from "react"
import { listCity, listBuilding, listSite, listService } from "../components/Const"

export const AdminService = (): React.ReactElement => {
    const [liste, setListe] = useState([{ id: 0, nom: "Ville", list: { listCity } }, { id: 0, nom: "Bâtiment", list: { listBuilding } }, { id: 0, nom: "Site", list: { listSite } }, { id: 0, nom: "Service", list: { listService } }]);
    const elements = liste.map((elem) => <FilterBar label={elem.nom} list={elem.list} />)

    return (
        <div className="home">
            <h1>Gestion des services</h1>
            <Stack className="stack">
                {elements}
            </Stack>
        </div>
    )
}
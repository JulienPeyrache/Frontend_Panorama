import { Stack } from "@mui/system"
import FilterBar from "../components/FilterBar"
// import { Button } from "@mui/material"
import logo from "../assets/logo_macif.png"
import "./AdminService.css"
import { useState } from "react"

export const AdminService = (): React.ReactElement => {
    const [liste, setListe] = useState([{ id: 0, nom: "Test" }]);
    const elements = liste.map((elem) => <FilterBar label={elem.nom} />)

    return (
        <div className="home">
            <h1>Gestion des services</h1>
            <img className="logo" src={logo} alt="Logo MACIF" />
            <FilterBar label='' />
            <Stack className="stack">
                {elements}
            </Stack>
        </div>
    )
}
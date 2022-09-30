import { Stack } from "@mui/system";
// import FilterBar from "../components/FilterBar"
// import { Button } from "@mui/material"
import logo from "../assets/logo_macif.png";
import "./AdminService.css";
import { useState } from "react";
import { listChamps, listChampsFilterBar } from "../components/Const";

export const AdminService = (): React.ReactElement => {
    const [liste, setListe] = useState(listChamps);

    return (
        <div className="home">
            <h1>Gestion des services</h1>
            <Stack className="stack">{listChampsFilterBar}</Stack>
        </div>
    );
};

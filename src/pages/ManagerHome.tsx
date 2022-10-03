// import { Stack } from "@mui/system"
import FilterBar from "../components/FilterBar";
// import { Button } from "@mui/material"
import "./ManagerHome.css";
import { Grid } from "@mui/material";
import { useState } from "react";
import NavTabs from "../components/NavTabs";

export const ManagerHome = (): React.ReactElement => {
    return (
        <div className="manager_home">
            <h1>Gestion des services</h1>
            <NavTabs />
        </div>
    );
};

// import { Stack } from "@mui/system"
import FilterBar from "../components/FilterBar";
// import { Button } from "@mui/material"
import "./AdminHome.css";
import { useState } from "react";
import NavTabs from "../components/NavTabs";

export const AdminHome = (): React.ReactElement => {
    return (
        <div className="admin_home">
            <h1>Gestion des services</h1>
            <NavTabs />
        </div>
    );
};

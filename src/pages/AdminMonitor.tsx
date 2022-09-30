import { Stack } from "@mui/system";
// import FilterBar from "../components/FilterBar"
// import { Button } from "@mui/material"
import type {} from "@mui/x-data-grid/themeAugmentation";
import logo from "../assets/logo_macif.png";
import { Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import "./AdminAdmin.css";
import { useState } from "react";
import { listChamps, listChampsFilterBar } from "../components/Const";

const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 50 },
    { field: "code_course", headerName: "Code du parcours", width: 50 },
    { field: "label_course", headerName: "Libellé du parcours", width: 150 },
    { field: "description", headerName: "Description", width: 450 },
];

const rows: GridRowsProp = [
    {
        id: 1,
        code_course: "Hello",
        label_course: "World",
        description: "Hello World",
    },
    {
        id: 2,
        code_course: "XGrid",
        label_course: "is Awesome",
        description: "XGrid is Awesome",
    },
    {
        id: 3,
        code_course: "Material-UI",
        label_course: "is Amazing",
        description: "Material-UI is Amazing",
    },
];

export const AdminAdmin = (): React.ReactElement => {
    const [liste, setListe] = useState(listChamps);

    return (
        <div className="home">
            <h1>Mes services</h1>
            <Stack className="stack">{listChampsFilterBar}</Stack>
            <div style={{ display: "flex", height: "100%" }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        autoHeight={true}
                        aria-label="Test"
                        autoPageSize={true}
                        checkboxSelection={true}
                        density="comfortable"
                        editMode="cell"
                    ></DataGrid>
                </div>
            </div>
        </div>
    );
};

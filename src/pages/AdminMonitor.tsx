import { Stack } from "@mui/system";
// import FilterBar from "../components/FilterBar"
// import { Button } from "@mui/material"
import type {} from "@mui/x-data-grid/themeAugmentation";
// import logo from "../assets/logo_macif.png";
// import { Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import "./AdminMonitor.css";
import { useState, useEffect } from "react";
import {
    listChamps,
    listChampsFilterBar,
    rowsParcours,
    theme,
} from "../components/Const";
import { ThemeProvider } from "@mui/material";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "code", headerName: "Code du parcours", width: 50 },
    // { field: "label", headerName: "Libellé du glossaire", width: 150 },
    { field: "description", headerName: "Description", width: 450 },
];

export const MonitorAdmin = (): React.ReactElement => {
    const [tableData, setTableData] = useState(rowsParcours);
    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/posts")
    //         .then((data) => data.json())
    //         .then((data) => setTableData(data));
    // }, []);
    console.log(columns, tableData);

    return (
        <ThemeProvider theme={theme}>
            <div className="home">
                <h1>Mes services</h1>
                <Stack className="stack">{listChampsFilterBar}</Stack>
                <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            columns={columns}
                            rows={tableData}
                            autoHeight={true}
                            checkboxSelection={true}
                            density="comfortable"
                            editMode="cell"
                        ></DataGrid>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

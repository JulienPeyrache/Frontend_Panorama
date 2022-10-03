import { Stack } from "@mui/system";
// import FilterBar from "../components/FilterBar"
// import { Button } from "@mui/material"
import type {} from "@mui/x-data-grid/themeAugmentation";
// import logo from "../assets/logo_macif.png";
// import { Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { theme, baseURL } from "../components/Const";
import { ThemeProvider } from "@mui/material";
import axios from "axios";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "code_course", headerName: "Code du parcours", width: 50 },
    // { field: "label", headerName: "Libellé du glossaire", width: 150 },
    { field: "label_course", headerName: "Libellé du parcours", width: 500 },
    { field: "description", headerName: "Description", width: 2000 },
];

export const TabAttachedService = (): React.ReactElement => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios
            .get(baseURL + "/api/course")
            .then((data) => setTableData(data.data));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="home">
                <h1>Parcours</h1>
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

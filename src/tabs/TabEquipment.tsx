import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import axios from "axios";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "code_course", headerName: "Code du parcours", width: 50 },
    // { field: "label", headerName: "Libellé du glossaire", width: 150 },
    { field: "label_course", headerName: "Libellé du parcours", width: 500 },
    { field: "description", headerName: "Description", width: 2000 },
];

export const TabEquipment = (): React.ReactElement => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios
            .get(baseURL + "/api/course")
            .then((data) => setTableData(data.data));
    }, []);

    return (
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
    );
};

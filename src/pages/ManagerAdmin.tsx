import { Stack } from "@mui/system";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import "./ManagerAdmin.css";
import { NavTabsTables } from "../components/NavTabs";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "code_course", headerName: "Code du parcours", width: 50 },
    // { field: "label", headerName: "Libellé du glossaire", width: 150 },
    { field: "label_course", headerName: "Libellé du parcours", width: 500 },
    { field: "description", headerName: "Description", width: 2000 },
];

export const ManagerAdmin = (): React.ReactElement => {
    return <NavTabsTables />;
};

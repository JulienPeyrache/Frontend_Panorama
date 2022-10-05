import { Stack } from "@mui/system";
import type {} from "@mui/x-data-grid/themeAugmentation";
import "./ManagerService.css";
import { listChampsFilterBar } from "../components/Const";

export const ManagerService = (): React.ReactElement => {
    return (
        <div className="home">
            <h2>Mes services</h2>
            <Stack className="stack">{listChampsFilterBar}</Stack>
        </div>
    );
};

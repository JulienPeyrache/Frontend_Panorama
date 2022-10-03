import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import { baseURL } from "../components/Const";
import { useEffect, useState } from "react";
import axios from "axios";

export const ManagerEquipment = (): React.ReactElement => {

    const [equipments, setEquipments] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get(baseURL + "/api/equipment")
            .then((res) => setEquipments(res.data));
    }, []);

    return (
        <Grid2 container spacing={2} sx={{color: "black",}}>
            {equipments.map((equipment) => (<Grid2 key={equipment.id} xs="auto">
                <Item>Coucou</Item>
            </Grid2>))}        
        </Grid2>
    )
};

import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import { TextField } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID" },
	{ field: "code_course", headerName: "Code du parcours", width: 50 },
	{ field: "label_course", headerName: "Libellé du parcours", width: 500 },
	{ field: "description", headerName: "Description", width: 2000 },
];

export const TabCourse = (): React.ReactElement => {
	const [tableData, setTableData] = useState([]);
	const [codeCourse, setCodeCourse] = useState<any[]>([]);
	const [labelCourse, setLabelCourse] = useState<any[]>([]);
	const [description, setDescriptio] = useState<any[]>([]);

	useEffect(() => {
		axios.get(baseURL + "/api/course").then((data) => setTableData(data.data));
	}, []);

	function handleClick() {
		return {};
	}

	return (
		<div className="displayAdmin">
			<div style={{ display: "flex", height: "100%" }}>
				<Button
					sx={{ marginBottom: "4%" }}
					variant="contained"
					onClick={handleClick}
				>
					Ajouter un service
				</Button>
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
	);
};

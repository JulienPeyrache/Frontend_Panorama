import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { AttachedService } from "./TabAttachedService";

export interface Item {
	label_item: string;
	default_value?: string;
	is_occupant_info: boolean;
	attachedService: AttachedService;
}

export interface Course {
	code_course: string;
	label_course: string;
	description: string;
}

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID" },
	{ field: "code_course", headerName: "Code du parcours", width: 50 },
	{ field: "label_course", headerName: "Libellé du parcours", width: 500 },
	{ field: "description", headerName: "Description", width: 2000 },
];

export interface State extends SnackbarOrigin {
	open: boolean;
}

export const TabItem = (): React.ReactElement => {
	const [tableData, setTableData] = useState([]);
	const [newCourse, setNewCourse] = useState<Course | null>();
	const [newCodeCourse, setNewCodeCourse] = useState<string>("");
	const [newLabelCourse, setNewLabelCourse] = useState<string>("");
	const [newDescription, setNewDescription] = useState<string>("");
	const [isShown, setIsShown] = useState(false);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [messageSnackBar, setMessageSnackBar] = useState<string>("");
	useEffect(() => {
		axios.get(baseURL + "/api/course").then((data) => setTableData(data.data));
	}, [newCourse]);

	function handleClick() {
		setIsShown(!isShown);
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<Button id="add-course-button" variant="contained" onClick={handleClick}>
				Ajouter un service
			</Button>
			{isShown && (
				<div>
					<h2>Ajouter un parcours</h2>
					<Grid2
						container
						spacing={2}
						sx={{ color: "black", justifyContent: "center" }}
					>
						<Grid2
							key="codeCourse"
							xs="auto"
							sx={{ display: "flex", flexDirection: "row" }}
						>
							<Item
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								Code Parcours :
							</Item>
							<TextField
								value={newCodeCourse}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const newValue = event.target.value;
									setNewCodeCourse(newValue);
								}}
								sx={{
									m: 1,
									width: "10ch",
									backgroundColor: "white",
								}}
							></TextField>
						</Grid2>
						<Grid2
							key="labelCourse"
							xs="auto"
							sx={{ display: "flex", flexDirection: "row" }}
						>
							<Item
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								Libellé du Parcours :
							</Item>
							<TextField
								value={newLabelCourse}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const newValue = event.target.value;
									setNewLabelCourse(newValue);
								}}
								sx={{
									m: 1,
									width: "10ch",
									backgroundColor: "white",
								}}
							></TextField>
						</Grid2>
						<Grid2
							key="description"
							xs="auto"
							sx={{ display: "flex", flexDirection: "row" }}
						>
							<Item
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								Description :
							</Item>
							<TextField
								value={newDescription}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const newValue = event.target.value;
									setNewDescription(newValue);
								}}
								sx={{
									m: 1,
									width: "10ch",
									backgroundColor: "white",
								}}
							></TextField>
						</Grid2>
					</Grid2>
					<Grid2 container sx={{ justifyContent: "center" }}>
						<Button
							id="validation-button"
							disabled={
								!(
									newDescription !== "" &&
									newLabelCourse !== "" &&
									newCodeCourse !== ""
								)
							}
							variant="contained"
							onClick={() => {
								if (
									newDescription !== "" &&
									newLabelCourse !== "" &&
									newCodeCourse !== ""
								) {
									setNewCourse({
										description: newDescription,
										label_course: newLabelCourse,
										code_course: newCodeCourse,
									});
									console.log(newCourse);
									axios.post(baseURL + "/api/course", newCourse);
									axios
										.get(baseURL + "api/course/findByCode/" + newCodeCourse)
										.then((res) => {
											if (newCourse == res.data) {
												setMessageSnackBar("Nouveau parcours ajouté");
												setOpenSnackBar(true);
											} else {
												setMessageSnackBar(
													"Il semblerait que cela n'ait pas fonctionné... :/"
												);
												setOpenSnackBar(true);
											}
										});
									setNewDescription("");
									setNewLabelCourse("");
									setNewCodeCourse("");
								} else {
									setNewCourse(null);
								}
							}}
						>
							Valider les modifications
						</Button>
						<Snackbar
							anchorOrigin={{ horizontal: "right", vertical: "top" }}
							open={openSnackBar}
							onClose={() => setOpenSnackBar(false)}
							message={messageSnackBar}
						/>
					</Grid2>
				</div>
			)}
			<div style={{ flexGrow: 1 }}>
				<h2> Liste des parcours </h2>
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

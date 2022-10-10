import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	GridColumns,
	GridRowParams,
	MuiEvent,
	GridToolbarContainer,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
} from "@mui/x-data-grid";
export interface Course {
	code_course: string;
	label_course: string;
	description: string;
}

// export interface State extends SnackbarOrigin {
// 	open: boolean;
// }

// interface EditToolbarProps {
// 	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
// 	setRowModesModel: (
// 		newModel: (oldModel: GridRowModesModel) => GridRowModesModel
// 	) => void;
// }

export const TabCourse = (): React.ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newCourse, setNewCourse] = useState<Course | null>(null);
	// const [openSnackBar, setOpenSnackBar] = useState(false);
	// const [messageSnackBar, setMessageSnackBar] = useState<string>("");
	useEffect(() => {
		axios.get(baseURL + "/api/course").then((data) => setRows(data.data));
		console.log("Coucou");
	}, [newCourse]);

	function EditToolbar() {
		const [newCodeCourse, setNewCodeCourse] = useState<string>("");
		const [newLabelCourse, setNewLabelCourse] = useState<string>("");
		const [newDescription, setNewDescription] = useState<string>("");

		return (
			<GridToolbarContainer>
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
						startIcon={<AddIcon />}
						onClick={() => {
							if (
								newDescription !== "" &&
								newLabelCourse !== "" &&
								newCodeCourse !== ""
							) {
								const TempCourse: Course = {
									description: newDescription,
									label_course: newLabelCourse,
									code_course: newCodeCourse,
								};
								console.log(TempCourse);
								axios.post(baseURL + "/api/course", TempCourse);
								setNewCourse(TempCourse);
								// axios
								// 	.get(baseURL + "api/course/findByCode/" + newCodeCourse)
								// 	.then((res) => {
								// 		if (newCourse == res.data) {
								// 			setMessageSnackBar("Nouveau parcours ajouté");
								// 			setOpenSnackBar(true);
								// 		} else {
								// 			setMessageSnackBar(
								// 				"Il semblerait que cela n'ait pas fonctionné... :/"
								// 			);
								// 			setOpenSnackBar(true);
								// 		}
								// });
								setNewDescription("");
								setNewLabelCourse("");
								setNewCodeCourse("");
							} else {
								setNewCourse(null);
							}
						}}
					>
						Ajouter un nouveau parcours
					</Button>
					{/* <Snackbar
						anchorOrigin={{ horizontal: "right", vertical: "top" }}
						open={openSnackBar}
						onClose={() => setOpenSnackBar(false)}
						message={messageSnackBar}
					/> */}
				</Grid2>
			</GridToolbarContainer>
		);
	}

	const handleRowEditStart = (
		params: GridRowParams,
		event: MuiEvent<React.SyntheticEvent>
	) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event
	) => {
		event.defaultMuiPrevented = true;
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.id === id);
		if (editedRow!.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false },
		{
			field: "code_course",
			headerName: "Code du parcours",
			type: "string",
			editable: true,
		},
		{
			field: "label_course",
			headerName: "Libellé du parcours",
			type: "string",
			editable: true,
		},
		{
			field: "description",
			headerName: "Description",
			type: "string",
			editable: true,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<div style={{ flexGrow: 1 }}>
				<h2> Liste des parcours </h2>
				<DataGrid
					columns={columns}
					rows={rows}
					autoHeight={true}
					checkboxSelection={true}
					density="comfortable"
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
					onRowEditStart={handleRowEditStart}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					components={{
						Toolbar: EditToolbar,
					}}
					experimentalFeatures={{ newEditingApi: true }}
				></DataGrid>
			</div>
		</div>
	);
};

import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../assets/Const";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
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
import { Course } from "../interfaces/entities";

export const TabCourse = (): React.ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newCourse, setNewCourse] = useState<Course | null>(null);

	useEffect(() => {
		axios.get(baseURL + "/api/course").then((data) => setRows(data.data));
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
					sx={{
						color: "black",
						justifyContent: "center",
					}}
				>
					<Grid2
						key="codeCourse"
						xs={12}
						sm={4}
						md={3}
						sx={{ display: "flex", flexDirection: "row" }}
					>
						<Item
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							Code du parcours :
						</Item>
						<TextField
							value={newCodeCourse}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewCodeCourse(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="labelCourse"
						xs={12}
						sm={4}
						md={3}
						sx={{ display: "flex", flexDirection: "row" }}
					>
						<Item
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							Libellé du parcours :
						</Item>
						<TextField
							value={newLabelCourse}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewLabelCourse(newValue);
							}}
							sx={{
								m: 1,
								width: "auto",
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="description"
						xs={12}
						sm={6}
						md={6}
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
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
				</Grid2>
				<Grid2
					container
					sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
				>
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
								axios
									.post(baseURL + "/api/course", TempCourse)
									.then(() => setNewCourse(TempCourse));

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
		if (window.confirm("Voulez-vous vraiment supprimer ce parcours ?")) {
			const currentRow = rows.find((row) => row.id === id);
			const idCurrentRow = currentRow?.id;
			axios.delete(baseURL + "/api/course/" + idCurrentRow);
			setRows(rows.filter((row) => row.id !== id));
		}
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
		const idCourse = newRow?.id;
		const codeCourse = newRow?.code_course;
		const labelCourse = newRow?.label_course;
		const description = newRow?.description;
		const TempCourse: Course = {
			description: description,
			label_course: labelCourse,
			code_course: codeCourse,
		};
		axios.patch(baseURL + "/api/course/" + idCourse, TempCourse);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "code_course",
			headerName: "Code du parcours",
			type: "string",
			editable: true,
			flex: 0.5,
		},
		{
			field: "label_course",
			headerName: "Libellé du parcours",
			type: "string",
			editable: true,
			flex: 3,
		},
		{
			field: "description",
			headerName: "Description",
			type: "string",
			editable: true,
			flex: 10,
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
					checkboxSelection={false}
					density="comfortable"
					editMode="row"
					getRowHeight={() => "auto"}
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

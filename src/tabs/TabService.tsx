import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, ReactElement } from "react";
import { baseURL } from "../components/Const";
import React from "react";
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
import FilterBar from "../components/FilterBar";
import { Service, Course } from "../interfaces/entities";

export const TabService = (): ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newService, setNewService] = useState<Service | null>(null);

	useEffect(() => {
		axios.get(baseURL + "/api/service").then((data) => setRows(data.data));
	}, [newService]);

	const [newCourseList, setNewCourseList] = useState<Course[]>([]);
	useEffect(() => {
		axios
			.get(baseURL + "/api/course")
			.then((data) => setNewCourseList(data.data));
	}, []);

	function EditToolbar() {
		const [newCodeService, setNewCodeService] = useState<string>("");
		const [newLabelService, setNewLabelService] = useState<string>("");
		const [newCourse, setNewCourse] = useState<Course | null>(null);

		return (
			<GridToolbarContainer>
				<Grid2
					container
					spacing={2}
					sx={{ color: "black", justifyContent: "center" }}
				>
					<Grid2
						key="code-service"
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
							Code du service :
						</Item>
						<TextField
							value={newCodeService}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewCodeService(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="label-service"
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
							Nom du service :
						</Item>
						<TextField
							value={newLabelService}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewLabelService(newValue);
							}}
							sx={{
								m: 1,
								width: "auto",
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="course"
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
							Parcours dans lequel s'intègre le service :
						</Item>
						<FilterBar
							label="..."
							liste={newCourseList.map((course) => course.label_course)}
							onChange={(event: any, newValue: string | null) => {
								const course = newCourseList.find(
									(course) => course.label_course === newValue
								);
								if (course !== undefined) {
									setNewCourse(course);
								}
							}}
							width={200}
						/>
					</Grid2>
				</Grid2>
				<Grid2 container sx={{ justifyContent: "center" }}>
					<Button
						id="validation-button"
						disabled={
							!(
								newCodeService !== "" &&
								newLabelService !== "" &&
								newCourse !== null
							)
						}
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => {
							if (
								newCodeService !== "" &&
								newLabelService !== "" &&
								newCourse !== null
							) {
								const TempService: Service = {
									code_service: newCodeService,
									label_service: newLabelService,
									course: newCourse,
								};
								axios.post(baseURL + "/api/service", TempService);
								setNewService(TempService);

								setNewLabelService("");
								setNewCodeService("");
								setNewCourse(null);
							} else {
								setNewService(null);
							}
						}}
					>
						Ajouter un nouveau service
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
		if (window.confirm("Voulez-vous vraiment supprimer ce service ?")) {
			const currentRow = rows.find((row) => row.id === id);
			const idCurrentRow = currentRow?.id;
			axios.delete(baseURL + "/api/service/" + idCurrentRow);
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
		const idService = newRow?.id;
		const labelService = newRow?.label_service;
		const course = newRow?.course;
		const codeService = newRow?.code_service;
		const service: Service = {
			code_service: codeService,
			label_service: labelService,
			course: course,
		};
		axios.patch(baseURL + "/api/service/" + idService, service);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "code_service",
			headerName: "Code service",
			type: "string",
			editable: true,
			flex: 0.5,
		},
		{
			field: "label_service",
			headerName: "Libellé du service",
			type: "string",
			editable: true,
			flex: 5,
		},
		{
			field: "course",
			headerName: "Parcours",
			type: "Course",
			editable: true,
			flex: 3,
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
				<h2> Liste des services </h2>
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

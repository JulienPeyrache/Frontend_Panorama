import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import axios from "axios";
import { Button, Select, SelectChangeEvent, TextField } from "@mui/material";
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
import { Equipment, Step } from "../interfaces/entities";

export const TabEquipment = (): React.ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newEquipment, setNewEquipment] = useState<Equipment | null>(null);

	useEffect(() => {
		axios.get(baseURL + "/api/equipment").then((data) => setRows(data.data));
	}, [newEquipment]);

	function EditToolbar() {
		const [newLabelEquipment, setNewLabelEquipment] = useState<string>("");
		const [newStep, setNewStep] = useState<Step | undefined>(undefined);

		return (
			<GridToolbarContainer>
				<Grid2
					container
					spacing={2}
					sx={{ color: "black", justifyContent: "center", display: "flex" }}
				>
					<Grid2
						key="label-equipment"
						xs={12}
						sm={12}
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
							Libellé de l'équipement :
						</Item>
						<TextField
							value={newLabelEquipment}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewLabelEquipment(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 10,
								backgroundColor: "white",
								width: "800px",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="step"
						xs={12}
						sm={12}
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
							Etape associée dans l'interface utilisateur (facultatif) :
						</Item>
						<FilterBar
							label="..."
							liste={Object.values(Step)}
							onChange={(event: any, newValue: string | null) => {
								if (newValue !== null) {
									setNewStep(newValue as Step);
								}
							}}
							width={300}
						/>
					</Grid2>
				</Grid2>
				<Grid2
					container
					sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
				>
					<Button
						id="validation-button"
						disabled={!(newLabelEquipment !== "")}
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => {
							if (newLabelEquipment !== "") {
								const TempEquipment: Equipment = {
									label_equipment: newLabelEquipment,
									step: newStep,
								};
								axios
									.post(baseURL + "/api/equipment", TempEquipment)
									.then(() => setNewEquipment(TempEquipment));

								setNewLabelEquipment("");
								setNewStep(undefined);
							} else {
								setNewEquipment(null);
							}
						}}
					>
						Ajouter un nouvel équipement
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
		if (window.confirm("Voulez-vous vraiment supprimer cet équipement ?")) {
			const currentRow = rows.find((row) => row.id === id);
			const idCurrentRow = currentRow?.id;
			axios.delete(baseURL + "/api/equipment/" + idCurrentRow);
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
		const idEquipment = newRow?.id;
		const labelEquipment = newRow?.label_equipment;
		const stepItem = newRow?.step === "<vide>" ? null : newRow?.step;

		const TempEquipment: Equipment = {
			label_equipment: labelEquipment,
			step: stepItem,
		};
		axios.patch(baseURL + "/api/equipment/" + idEquipment, TempEquipment);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "label_equipment",
			headerName: "Libellé équipement",
			type: "string",
			editable: true,
			flex: 3,
		},
		{
			field: "step",
			headerName: "Etape associée dans l'interface utilisateur",
			type: "singleSelect",
			editable: true,
			flex: 2,
			valueOptions: ["<vide>", ...Object.values(Step)],
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
				<h2> Liste des équipements </h2>
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

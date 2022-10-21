import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
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
import { Redirection, Step } from "../interfaces/entities";
import FilterBar from "../components/FilterBar";

export const TabRedirection = (): React.ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newRedirection, setNewRedirection] = useState<Redirection | null>(
		null
	);

	useEffect(() => {
		axios.get(baseURL + "/api/redirection").then((data) => setRows(data.data));
	}, [newRedirection]);

	function EditToolbar() {
		const [newStep, setNewStep] = useState<Step | undefined>(undefined);
		const [newLabel, setNewLabel] = useState<string>("");
		const [newUrl, setNewUrl] = useState<string>("");

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
							Etape associée dans l'interface utilisateur :
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
					<Grid2
						key="Label"
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
							Libellé :
						</Item>
						<TextField
							value={newLabel}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewLabel(newValue);
							}}
							sx={{
								m: 1,
								width: "auto",
								backgroundColor: "white",
								flexGrow: 1,
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="url"
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
							URL (exemple : https://macif.fr) :
						</Item>
						<TextField
							value={newUrl}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewUrl(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
								width: "auto",
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
							!(newUrl !== "" && newLabel !== "" && newStep !== undefined)
						}
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => {
							if (newUrl !== "" && newLabel !== "" && newStep !== undefined) {
								const TempRedirection: Redirection = {
									url: newUrl,
									label: newLabel,
									step: newStep,
								};
								axios
									.post(baseURL + "/api/redirection", TempRedirection)
									.then(() => setNewRedirection(TempRedirection));

								setNewUrl("");
								setNewLabel("");
								setNewStep(undefined);
							} else {
								setNewRedirection(null);
							}
						}}
					>
						Ajouter une nouvelle redirection
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
			axios.delete(baseURL + "/api/redirection/" + idCurrentRow);
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
		const idRedirection = newRow?.id;
		const step = newRow?.step;
		const label = newRow?.label;
		const url = newRow?.url;
		const TempRedirection: Redirection = {
			url: url,
			label: label,
			step: step,
		};
		axios.patch(baseURL + "/api/redirection/" + idRedirection, TempRedirection);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "step",
			headerName: "Etape associée dans l'interface utilisateur",
			type: "singleSelect",
			editable: true,
			flex: 2,
			valueOptions: Object.values(Step),
		},
		{
			field: "label",
			headerName: "Libellé du parcours",
			type: "string",
			editable: true,
			flex: 3,
		},
		{
			field: "url",
			headerName: "URL",
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

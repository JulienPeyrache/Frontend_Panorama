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
import FilterBar from "../components/FilterBar";
import { Service, AttachedService } from "../interfaces/entities";

export const TabAttachedService = (): React.ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newServiceList, setNewServiceList] = useState<Service[]>([]);
	const [newAttachedService, setNewAttachedService] =
		useState<AttachedService | null>(null);

	useEffect(() => {
		axios
			.get(baseURL + "/api/Attached-Service")
			.then((data) => setRows(data.data));
		console.log("Get attached service");
	}, [newAttachedService]);

	useEffect(() => {
		axios
			.get(baseURL + "/api/service")
			.then((data) => setNewServiceList(data.data));
		console.log("Get services");
	}, []);

	function EditToolbar() {
		const [newLabelAttachedService, setNewLabelAttachedService] =
			useState<string>("");
		const [newService, setNewService] = useState<Service | undefined | null>(
			null
		);

		return (
			<GridToolbarContainer>
				<Grid2
					container
					spacing={2}
					sx={{ color: "black", justifyContent: "center" }}
				>
					<Grid2
						key="label-attached-service"
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
							Libellé Service Rattaché :
						</Item>
						<TextField
							value={newLabelAttachedService}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewLabelAttachedService(newValue);
							}}
							sx={{
								m: 1,
								width: "10ch",
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="service"
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
							Service :
						</Item>
						<FilterBar
							label="..."
							liste={newServiceList.map((service) => service.label_service)}
							onChange={(event: any, newValue: string | null) => {
								const service = newServiceList.find(
									(service) => service.label_service === newValue
								);
								service !== undefined
									? setNewService(service)
									: setNewService(null);
							}}
						/>
					</Grid2>
				</Grid2>
				<Grid2 container sx={{ justifyContent: "center" }}>
					<Button
						id="validation-button"
						disabled={!(newService !== null && newLabelAttachedService !== "")}
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => {
							if (
								newService !== null &&
								newService !== undefined &&
								newLabelAttachedService !== ""
							) {
								const TempAttachedService: AttachedService = {
									label_attached_service: newLabelAttachedService,
									service: newService,
								};
								console.log(TempAttachedService);
								axios.post(
									baseURL + "/api/Attached-Service",
									TempAttachedService
								);

								setNewService(null);
								setNewLabelAttachedService("");
							} else {
								setNewAttachedService(null);
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
		const currentRow = rows.find((row) => row.id === id);
		const idCurrentRow = currentRow?.id;
		console.log(idCurrentRow);
		console.log("Delete");
		axios.delete(baseURL + "/api/Attached-Service/" + idCurrentRow);
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
		const idAttachedService = newRow?.id;
		const labelAttachedService = newRow?.label_attached_service;
		const service = newRow?.service;
		const TempAttachedService: AttachedService = {
			label_attached_service: labelAttachedService,
			service: service,
		};
		console.log(idAttachedService);
		console.log("Patch");
		axios.patch(
			baseURL + "/api/attached-service/" + idAttachedService,
			TempAttachedService
		);
		console.log(TempAttachedService);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "label_attached_service",
			headerName: "Libellé du service rattaché",
			type: "string",
			editable: true,
		},
		{ field: "service", headerName: "Service", type: "string", editable: true },
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
				<h2> Liste des services rattachés </h2>
				<DataGrid
					columns={columns}
					rows={rows}
					autoHeight={true}
					checkboxSelection={false}
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

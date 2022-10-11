import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, ReactElement } from "react";
import { baseURL } from "../components/Const";
import React from "react";
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
import { AttachedService, ItemMacif } from "../interfaces/entities";

export const TabItem = (): ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newItem, setNewItem] = useState<ItemMacif | null>(null);

	useEffect(() => {
		axios.get(baseURL + "/api/item").then((data) => setRows(data.data));
		console.log("Get");
	}, [newItem]);

	const [newAttachedServicesList, setNewAttachedServiceList] = useState<
		AttachedService[]
	>([]);
	useEffect(() => {
		axios
			.get(baseURL + "/api/attached-service")
			.then((data) => setNewAttachedServiceList(data.data));
		console.log("Attached service list fetched");
	}, []);

	function EditToolbar() {
		const [newLabelItem, setNewLabelItem] = useState<string>("");
		const [newDefaultValue, setNewDefaultValue] = useState<string>("");
		const [newOccupantInfo, setNewOccupantInfo] = useState<boolean>(true);
		const [newAttachedService, setNewAttachedService] =
			useState<AttachedService | null>(null);

		return (
			<GridToolbarContainer>
				<Grid2
					container
					spacing={2}
					sx={{ color: "black", justifyContent: "center" }}
				>
					<Grid2
						key="label-item"
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
							Nom item :
						</Item>
						<TextField
							value={newLabelItem}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewLabelItem(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="default-value"
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
							Valeur par défaut :
						</Item>
						<TextField
							value={newDefaultValue}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewDefaultValue(newValue);
							}}
							sx={{
								m: 1,
								width: "auto",
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="occupant-info"
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
							Est une information accessible aux occupants :
						</Item>
						<div className="select-container">
							<FilterBar
								label="..."
								liste={["Oui", "Non"]}
								value={newOccupantInfo ? "Oui" : "Non"}
								onChange={(event: any, newValue: string | null) => {
									newValue === "Oui"
										? setNewOccupantInfo(true)
										: setNewOccupantInfo(false);
								}}
							/>
						</div>
					</Grid2>
					<Grid2
						key="attached-service"
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
							Service rattaché :
						</Item>
						<FilterBar
							label="..."
							liste={newAttachedServicesList.map(
								(service) => service.label_attached_service
							)}
							onChange={(event: any, newValue: string | null) => {
								const attachedService = newAttachedServicesList.find(
									(attachedService) =>
										attachedService.label_attached_service === newValue
								);
								if (typeof attachedService !== "undefined") {
									setNewAttachedService(attachedService);
								}
							}}
						/>
						{/* <Select
							onChange={(event: SelectChangeEvent<number>) => {
								const attachedService = newAttachedServicesList.find(
									(attachedService) => attachedService.id === event.target.value
								);
								if (typeof attachedService !== "undefined") {
									setNewAttachedService(attachedService);
								}
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						>
							{newAttachedServicesList.map(
								(attachedService: AttachedService) => (
									<option value={attachedService.id}>
										{attachedService.label_attached_service}
									</option>
								)
							)}
						</Select> */}
					</Grid2>
				</Grid2>
				<Grid2 container sx={{ justifyContent: "center" }}>
					<Button
						id="validation-button"
						disabled={!(newLabelItem !== "" && newAttachedService !== null)}
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => {
							if (newLabelItem !== "" && newAttachedService !== null) {
								const TempItem: ItemMacif = {
									label_item: newLabelItem,
									is_occupant_info: newOccupantInfo,
									attachedService: newAttachedService,
								};
								console.log(TempItem);
								axios.post(baseURL + "/api/course", TempItem);
								setNewItem(TempItem);

								setNewLabelItem("");
								setNewDefaultValue("");
								setNewOccupantInfo(true);
								setNewAttachedService(null);
							} else {
								setNewItem(null);
							}
						}}
					>
						Ajouter un nouvel item
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
		axios.delete(baseURL + "/api/item/" + idCurrentRow);
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
		const idItem = newRow?.id;
		const labelItem = newRow?.label_item;
		const isOccupantInfo = newRow?.is_occupant_info;
		const attachedService = newRow?.attachedService;
		const default_value = newRow?.default_value;
		const item: ItemMacif = {
			label_item: labelItem,
			is_occupant_info: isOccupantInfo,
			attachedService: attachedService,
			default_value: default_value,
		};
		console.log(item);
		console.log("Patch");
		axios.patch(baseURL + "/api/item/" + idItem, item);
		console.log(item);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "label-item",
			headerName: "Libellé de l'item",
			type: "string",
			editable: true,
		},
		{
			field: "default-value",
			headerName: "Valeur par défaut",
			type: "string",
			editable: true,
		},
		{
			field: "is-occupant-info",
			headerName: "Accessible aux occupants",
			type: "boolean",
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
				<h2> Liste des items </h2>
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

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
import { AttachedService, ItemMacif, Service } from "../interfaces/entities";

export const TabItem = (): ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newItem, setNewItem] = useState<ItemMacif | null>(null);
	const [serviceList, setServiceList] = useState<any[]>([]);
	const [newAttachedServicesList, setNewAttachedServiceList] = useState<any[]>(
		[]
	);

	useEffect(() => {
		axios
			.get(baseURL + "/api/attached-service")
			.then((data) => setNewAttachedServiceList(data.data));

		axios
			.get(baseURL + "/api/service")
			.then((data) => setServiceList(data.data));
	}, []);

	useEffect(() => {
		axios.get(baseURL + "/api/item").then((data) =>
			setRows(
				data.data.map((item: any) => ({
					...item,
					attachedService:
						item.attachedService.label_attached_service +
						" - " +
						serviceList.find(
							(service) => service.id === item.attachedService.serviceId
						)?.code_service,
				}))
			)
		);
	}, [newItem, serviceList]);

	function EditToolbar() {
		const [newLabelItem, setNewLabelItem] = useState<string>("");
		const [newOccupantInfo, setNewOccupantInfo] = useState<boolean>(true);
		const [newAttachedService, setNewAttachedService] =
			useState<AttachedService | null>(null);

		return (
			<GridToolbarContainer>
				<Grid2
					container
					spacing={2}
					sx={{ color: "black", justifyContent: "center", display: "flex" }}
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
							Nom de l'item :
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
								width: "600px",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="attached-service"
						xs={12}
						sm={8}
						md={5}
						sx={{ display: "flex", flexDirection: "row" }}
					>
						<Item
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							Service rattaché associé :
						</Item>
						<FilterBar
							label="..."
							liste={newAttachedServicesList.map(
								(attachedService) =>
									attachedService.label_attached_service +
									" - " +
									serviceList.find(
										(service) => service.id === attachedService.serviceId
									)?.code_service
							)}
							onChange={(event: any, newValue: string | null) => {
								const attachedService = newAttachedServicesList.find(
									(attachedService: any) =>
										attachedService.label_attached_service +
											" - " +
											serviceList.find(
												(service) => service.id === attachedService.serviceId
											)?.code_service ===
										newValue
								);
								if (typeof attachedService !== "undefined") {
									setNewAttachedService(attachedService);
								}
							}}
							width={400}
						/>
					</Grid2>
					<Grid2
						key="occupant-info"
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
							Est une information accessible aux occupants :
						</Item>
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
					</Grid2>
				</Grid2>
				<Grid2
					container
					sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
				>
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
								axios
									.post(baseURL + "/api/item", TempItem)
									.then(() => setNewItem(TempItem));

								setNewLabelItem("");
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
		if (window.confirm("Voulez-vous vraiment supprimer cet item ?")) {
			const currentRow = rows.find((row) => row.id === id);
			const idCurrentRow = currentRow?.id;
			axios.delete(baseURL + "/api/item/" + idCurrentRow);
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
		const idItem = newRow?.id;
		const labelItem = newRow?.label_item;
		const isOccupantInfo = newRow?.is_occupant_info;
		const attachedService = newAttachedServicesList.find(
			(attachedService: any) =>
				attachedService.label_attached_service +
					" - " +
					serviceList.find(
						(service) => service.id === attachedService.serviceId
					)?.code_service ===
				newRow.attachedService
		);
		const default_value = newRow?.default_value;
		const item = {
			label_item: labelItem,
			is_occupant_info: isOccupantInfo,
			attachedService: attachedService,
			default_value: default_value,
		};
		axios.patch(baseURL + "/api/item/" + idItem, item);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "label_item",
			headerName: "Libellé de l'item",
			type: "string",
			editable: true,
			flex: 5,
		},
		{
			field: "attachedService",
			headerName: "Service rattaché associé",
			type: "singleSelect",
			editable: true,
			valueOptions: newAttachedServicesList.map(
				(attachedService) =>
					attachedService.label_attached_service +
					" - " +
					attachedService.service.code_service
			),
			flex: 3.5,
		},
		{
			field: "is_occupant_info",
			headerName: "Accessible aux occupants",
			type: "boolean",
			editable: true,
			flex: 1,
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

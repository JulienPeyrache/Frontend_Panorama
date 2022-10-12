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
import {
	TypologyBuilding,
	Building,
} from "../interfaces/entities";
import FilterBar from "../components/FilterBar";

export const TabBuilding = (): React.ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newBuilding, setNewBuilding] = useState<Building | null>(null);

	useEffect(() => {
		axios.get(baseURL + "/api/building").then((data) => setRows(data.data));
		console.log("Get");
	}, [newBuilding]);

	function EditToolbar() {
		const [newTypologyBuilding, setNewTypologieBuilding] =
			useState<TypologyBuilding | null>(null);
		const [newNameBuilding, setNewNameBuilding] = useState<string>("");
		const [newAddress, setNewAddress] = useState<string>("");
		const [newCity, setNewCity] = useState<string>("");
		const [newPostalCode, setNewPostalCode] = useState<number>(-1);
		const [newBuildingId, setNewBuildingId] = useState<number>(-1);



		return (
			<GridToolbarContainer>
				<Grid2
					container
					spacing={2}
					sx={{ color: "black", justifyContent: "center" }}
				>
					<Grid2
						key="id"
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
							Identifiant du bâtiment :
						</Item>
						<TextField
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewBuildingId(newValue as unknown as number);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="typology-building"
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
							Typologie du bâtiment :
						</Item>
						<FilterBar
							label="..."
							liste={[
								"Mixte",
								"PAP",
								"Technique",
								"Tertiaire",
							]}
							onChange={(event: any, newValue: string | null) => {
								if (newValue !== null) {
									setNewTypologieBuilding(newValue as TypologyBuilding);
								}
							}}
						/>
					</Grid2>
					<Grid2
						key="name_building"
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
							Nom du bâtiment :
						</Item>
						<TextField
							value={newNameBuilding}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewNameBuilding(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="adress"
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
							Adresse :
						</Item>
						<TextField
							value={newAddress}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewAddress(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="postal_code"
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
							Code postal :
						</Item>
						<TextField
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewPostalCode(newValue as unknown as number);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="city"
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
							Ville :
						</Item>
						<TextField
							value={newCity}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewCity(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
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
								newTypologyBuilding!==null &&
								newNameBuilding!=="" &&
								newAddress!=="" &&
								newPostalCode!==-1 &&
								newCity!=="" &&
								newBuildingId!==-1

							)
						}
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => {
							if (
								newTypologyBuilding!==null &&
								newNameBuilding!=="" &&
								newAddress!=="" &&
								newPostalCode!==-1 &&
								newCity!=="" &&
								newBuildingId!==-1
							) {
								const TempBuilding: Building = {
									id: newBuildingId,
									typology_building: newTypologyBuilding,
									name_building: newNameBuilding,
									address: newAddress,
									postal_code: newPostalCode,
									city: newCity,
								};
								console.log(TempBuilding);
								axios.post(baseURL + "/api/building", TempBuilding);
								setNewBuilding(TempBuilding);
								setNewBuildingId(-1);
								setNewTypologieBuilding(null);
								setNewNameBuilding("");
								setNewAddress("");
								setNewPostalCode(-1);
								setNewCity("");

							} else {
								setNewBuilding(null);
							}
						}}
					>
						Ajouter un nouveau bâtiment
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
		axios.delete(baseURL + "/api/building/" + idCurrentRow);
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
		const idBuilding = newRow?.id;
		const newTypologyBuilding = newRow?.typology_building;
		const newNameBuilding = newRow?.name_building;
		const newAddress = newRow?.address;
		const newPostalCode = newRow?.postal_code;
		const newCity = newRow?.city;
		const TempBuilding: Building = {
			id: idBuilding,
			typology_building: newTypologyBuilding,
			name_building: newNameBuilding,
			address: newAddress,
			postal_code: newPostalCode,
			city: newCity,
		};

		console.log(idBuilding);
		console.log("Patch");
		axios.patch(baseURL + "/api/building/" + idBuilding, TempBuilding);
		console.log(TempBuilding);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{
			field: "id",
			headerName: "ID",
			type: "number",
			editable: true,
		},
		{
			field: "typology_building",
			headerName: "Typologie du bâtiment",
			type: "TypologyBuilding",
			editable: true,
		},
		{
			field: "name_building",
			headerName: "Nom du bâtiment",
			type: "string",
			editable: true,
		},
		{
			field: "address",
			headerName: "Adresse",
			type: "string",
			editable: true,
		},
		{
			field: "postal_code",
			headerName: "Code postal",
			type: "number",
			editable: true,
		},
		{
			field: "city",
			headerName: "Ville",
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
				<h2> Liste des bâtiments </h2>
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
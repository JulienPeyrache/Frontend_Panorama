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
	Site,
	TypologySite,
	Immo,
	ETOrganisation,
	Course,
	Building,
} from "../interfaces/entities";
import FilterBar from "../components/FilterBar";

export const TabSite = (): React.ReactElement => {
	const [rows, setRows] = useState<GridRowsProp>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [newSite, setNewSite] = useState<Site | null>(null);
	const [newBuildingList, setNewBuildingList] = useState<Building[]>([]);

	useEffect(() => {
		axios.get(baseURL + "/api/site").then((data) => setRows(data.data));
		console.log("Get");
	}, [newSite]);
	useEffect(() => {
		axios.get(baseURL + "/api/building").then((data) => setNewBuildingList(data.data));
		console.log("Get");
	}, []);

	function EditToolbar() {
		const [newTypologySite, setNewTypologieSite] =
			useState<TypologySite | null>(null);
		const [newImmo, setNewImmo] = useState<Immo | null>(null);
		const [newETOrganisation, setNewETOrganisation] =
			useState<ETOrganisation | null>(null);
		const [newComment, setNewComment] = useState<string>("");
		const [newIsCourrier, setNewIsCourrier] = useState<boolean>(false);
		const [newBuilding, setNewBuilding] = useState<Building | null>(null);
		const [newSiteId, setNewSiteId] = useState<number | null>(null);

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
							Identifiant du site :
						</Item>
						<TextField
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewSiteId(newValue as unknown as number);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="typology-site"
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
							Typologie du site :
						</Item>
						<FilterBar
							label="..."
							liste={[
								"ARCHIVES",
								"CRC PRO",
								"CRC COM",
								"CRC SIN",
								"CRD MACIF DIRECT",
								"Espace Restauration",
								"IRD",
								"PAP",
								"RE",
								"SGD",
								"SUPPORT",
								"Tertiaire",
							]}
							onChange={(event: any, newValue: string | null) => {
								if (newValue !== null) {
									setNewTypologieSite(newValue as TypologySite);
								}
							}}
						/>
					</Grid2>
					<Grid2
						key="immo"
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
							Immo :
						</Item>
						<FilterBar
							label="..."
							liste={[
								"AMM", "CNP", "FE", "Nord Est", "Ouest", "Sud Est",
							]}
							onChange={(event: any, newValue: string | null) => {
								if (newValue !== null) {
									setNewImmo(newValue as Immo);
								}
							}}
						/>
					</Grid2>
					<Grid2
						key="eto"
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
							ET Organisation :
						</Item>
						<FilterBar
							label="..."
							liste={[
								"AMM", "DIET CNP", "FE", "Nord Est", "Ouest", "Sud Est",
							]}
							onChange={(event: any, newValue: string | null) => {
								if (newValue !== null) {
									setNewETOrganisation(newValue as ETOrganisation);
								}
							}}
						/>
					</Grid2>
					<Grid2
						key="is-courrier"
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
							Le site est un courrier :
						</Item>
						<FilterBar
								label="..."
								liste={["Oui", "Non"]}
								value={newIsCourrier ? "Oui" : "Non"}
								onChange={(event: any, newValue: string | null) => {
									newValue === "Oui"
										? setNewIsCourrier(true)
										: setNewIsCourrier(false);
								}}
							/>
					</Grid2>
					<Grid2
						key="comment"
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
							Commentaire :
						</Item>
						<TextField
							value={newComment}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								const newValue = event.target.value;
								setNewComment(newValue);
							}}
							sx={{
								m: 1,
								flexGrow: 1,
								backgroundColor: "white",
							}}
						></TextField>
					</Grid2>
					<Grid2
						key="building"
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
							Bâtiment dans lequel le site se trouve :
						</Item>
						<FilterBar
								label="..."
								liste={(newBuildingList.map((building) => building.name_building))}
								onChange={(event: any, newValue: string | null) => {
									const building = newBuildingList.find(
										(building) =>
											building.name_building === newValue
									);
									if (building !== undefined) {
										setNewBuilding(building);
									}}}
							/>
				</Grid2>
				</Grid2>
				<Grid2 container sx={{ justifyContent: "center" }}>
					<Button
						id="validation-button"
						disabled={
							!(
								newTypologySite!==null &&
								newETOrganisation!==null &&
								newBuilding!==null && 
								newImmo !== null

							)
						}
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => {
							if (
								newTypologySite!==null &&
								newETOrganisation!==null &&
								newBuilding!==null && 
								newSiteId !== null &&
								newImmo !== null
							) {
								const TempSite:Site = {
									id: newSiteId,
									typology_site: newTypologySite,
									immo: newImmo,
									ET_organisation: newETOrganisation,
									is_courrier: newIsCourrier,
									comments: newComment,
									building: newBuilding,
								};
								console.log(TempSite);
								axios.post(baseURL + "/api/site", TempSite);
								setNewSite(TempSite);

								setNewETOrganisation(null);
								setNewBuilding(null);
								setNewSiteId(null);
								setNewImmo(null);							
								setNewTypologieSite(null);
								setNewIsCourrier(false);
								setNewComment("");

							} else {
								setNewSite(null);
							}
						}}
					>
						Ajouter un nouveau site
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
		axios.delete(baseURL + "/api/site/" + idCurrentRow);
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
		const idSite : number = newRow?.id;
		const typologySite = newRow?.typology_site;
		const immo = newRow?.immo;
		const ETOrganisation = newRow?.ET_organisation;
		const isCourrier = newRow?.is_courrier;
		const comments = newRow?.comments;
		const building = newRow?.building;

		const TempSite:Site = {
			id: idSite,
			typology_site: typologySite,
			immo: immo,
			ET_organisation: ETOrganisation,
			is_courrier: isCourrier,
			comments: comments,
			building: building,
		};
		console.log(idSite);
		console.log("Patch");
		axios.patch(baseURL + "/api/site/" + idSite, TempSite);
		console.log(TempSite);
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

		return updatedRow;
	};

	const columns: GridColumns = [
		{ field: "id", headerName: "ID", editable: false, hide: true },
		{
			field: "id",
			headerName: "ID",
			type: "number",
			editable: true,
		},
		{
			field: "typology_site",
			headerName: "Typologie du site",
			type: "TypologySite",
			editable: true,
		},
		{
			field: "immo",
			headerName: "Immo",
			type: "Immo",
			editable: true,
		},
		{
			field: "ET_organisation",
			headerName: "ET Organisation",
			type: "ETOrganisation",
			editable: true,
		},
		{
			field: "is_courrier",
			headerName: "Courrier",
			type: "boolean",
			editable: true,
		},
		{
			field: "comments",
			headerName: "Commentaires",
			type: "string",
			editable: true,
		},
		{
			field: "building",
			headerName: "Bâtiment",
			type: "Building",
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
				<h2> Liste des sites </h2>
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

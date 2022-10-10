import type {} from "@mui/x-data-grid/themeAugmentation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Service } from "./TabService";

export interface AttachedService {
	label_attached_service: string;
	service: Service;
}

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID" },
	{
		field: "label_attached_service",
		headerName: "Libellé du service rattaché",
	},
	{ field: "service", headerName: "Service" },
];

export interface State extends SnackbarOrigin {
	open: boolean;
}

export const TabAttachedService = (): React.ReactElement => {
	const [tableData, setTableData] = useState([]);
	const [newAttachedService, setNewAttachedService] =
		useState<AttachedService | null>();
	const [newLabelAttachedService, setNewLabelAttachedService] =
		useState<string>("");
	const [newService, setNewService] = useState<string>("");
	const [isShown, setIsShown] = useState(false);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [messageSnackBar, setMessageSnackBar] = useState<string>("");
	useEffect(() => {
		axios
			.get(baseURL + "/api/attachedservice")
			.then((data) => setTableData(data.data));
	}, [newAttachedService]);

	function handleClick() {
		setIsShown(!isShown);
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<Button
				id="add-attached-service-button"
				variant="contained"
				onClick={handleClick}
			>
				Ajouter un service rattaché
			</Button>
			{isShown && (
				<div>
					<h2>Ajouter un service rattaché</h2>
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
							<TextField
								value={newService}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									const newValue = event.target.value;
									setNewService(newValue);
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
							disabled={!(newService !== "" && newLabelAttachedService !== "")}
							variant="contained"
							onClick={() => {
								if (newService !== "" && newLabelAttachedService !== "") {
									// setNewAttachedService({
									// 	service: newService,
									// 	label_attached_service: newLabelAttachedService,
									// });
									console.log(newAttachedService);
									axios.post(
										baseURL + "/api/AttachedService",
										newAttachedService
									);
									axios
										.get(
											baseURL +
												"api/AttachedService/findByCode/" +
												newAttachedService
										)
										.then((res) => {
											if (newAttachedService == res.data) {
												setMessageSnackBar("Nouveau service rattaché ajouté");
												setOpenSnackBar(true);
											} else {
												setMessageSnackBar(
													"Il semblerait que cela n'ait pas fonctionné... :/"
												);
												setOpenSnackBar(true);
											}
										});
									setNewService("");
									setNewLabelAttachedService("");
								} else {
									setNewAttachedService(null);
								}
							}}
						>
							Valider les modifications
						</Button>
						<Snackbar
							anchorOrigin={{ horizontal: "right", vertical: "top" }}
							open={openSnackBar}
							onClose={() => setOpenSnackBar(false)}
							message={messageSnackBar}
						/>
					</Grid2>
				</div>
			)}
			<div style={{ flexGrow: 1 }}>
				<h2> Liste des services rattachés </h2>
				<DataGrid
					columns={columns}
					rows={tableData}
					autoHeight={true}
					checkboxSelection={true}
					density="comfortable"
					editMode="cell"
				></DataGrid>
			</div>
		</div>
	);
};

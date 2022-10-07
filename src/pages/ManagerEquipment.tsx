import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import { baseURL } from "../components/Const";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import FilterBar from "../components/FilterBar";
import "./ManagerEquipment.css";
import { Building, Site } from "../interfaces/entities";

export const ManagerEquipment = (): React.ReactElement => {
	const [equipments, setEquipments] = useState<any[]>([]);
	const [sites, setSites] = useState<any[]>([]);
	const [buildings, setBuildings] = useState<any[]>([]);
	const [chosenBuilding, setChosenBuilding] = useState<any>(null);
	const [chosenSiteId, setChosenSiteId] = useState<any>(null);
	const [chosenBuildingSite, setChosenBuildingSite] = useState<any>(null);
	const [valuesEquipmentBuilding, setValuesEquipmentBuilding] = useState<any[]>(
		[]
	);
	const [valuesEquipmentSite, setValuesEquipmentSite] = useState<any[]>([]);
	const [open, setOpen] = useState(false);

	const nameBuilding = (site: Site, buildings: Building[]): string => {
		const siteIndex = sites.indexOf(site);
		return buildings[siteIndex].name_building;
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		axios
			.get(baseURL + "/api/equipment")
			.then((res) => setEquipments(res.data));

		axios.get(baseURL + "/api/site").then((res) => setSites(res.data));

		axios
			.post(baseURL + "/api/site/listBuildingsLinked")
			.then((res) => setBuildings(res.data));
	}, []);

	useEffect(() => {
		if (chosenBuilding !== null) {
			axios
				.get(baseURL + "/api/building/findByName/" + chosenBuilding)
				.then((res) =>
					axios
						.get(
							baseURL +
								"/api/value-equipment-building/findByBuildingId/" +
								res.data.id
						)
						.then((res) => setValuesEquipmentBuilding(res.data))
				);
		} else {
			setValuesEquipmentBuilding([]);
		}
	}, [chosenBuilding]);

	useEffect(() => {
		if (chosenSiteId !== null) {
			axios
				.get(baseURL + "/api/site/" + chosenSiteId)
				.then((res) =>
					axios
						.get(
							baseURL + "/api/value-equipment-site/findBySiteId/" + res.data.id
						)
						.then((res) => setValuesEquipmentSite(res.data))
				);
		} else {
			setValuesEquipmentSite([]);
		}
	}, [chosenSiteId]);

	return (
		<>
			<FilterBar
				label="Choisir un site..."
				liste={
					buildings.length
						? sites.map(
								(site) =>
									nameBuilding(site, buildings) + " -- (" + site.id + ")"
						  )
						: []
				}
				value={chosenBuildingSite}
				onChange={(event: any, newValue: string | null) => {
					setChosenBuildingSite(newValue);
					setChosenBuilding(newValue?.split(" -- ")[0]);
					setChosenSiteId(newValue?.split(" -- ")[1].slice(1, -1));
				}}
			/>
			<h2>{chosenBuildingSite}</h2>
			<Grid2
				container
				spacing={2}
				sx={{ color: "black", justifyContent: "center" }}
			>
				{chosenSiteId !== null
					? equipments.map((equipment) => (
							<Grid2
								key={equipment.id}
								xs="auto"
								sx={{ display: "flex", flexDirection: "row" }}
							>
								<Item
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										color: valuesEquipmentBuilding.some(
											(value) => value.equipmentId === equipment.id
										)
											? "darkred"
											: "black",
									}}
								>
									{equipment.label_equipment}
								</Item>
								<TextField
									value={
										valuesEquipmentBuilding.some(
											(value) => value.equipmentId === equipment.id
										)
											? valuesEquipmentBuilding.find(
													(value) => value.equipmentId === equipment.id
											  )?.description
											: valuesEquipmentSite.some(
													(value) => value.equipmentId === equipment.id
											  )
											? valuesEquipmentSite.find(
													(value) => value.equipmentId === equipment.id
											  )?.description
											: ""
									}
									onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
										valuesEquipmentBuilding.some(
											(value) => value.equipmentId === equipment.id
										)
											? setValuesEquipmentBuilding(
													valuesEquipmentBuilding.map((value) =>
														value.equipmentId === equipment.id
															? {
																	...value,
																	description: event.target.value,
															  }
															: value
													)
											  )
											: setValuesEquipmentSite(
													valuesEquipmentSite.map((value) =>
														value.equipmentId === equipment.id
															? {
																	...value,
																	description: event.target.value,
															  }
															: value
													)
											  );
									}}
									sx={{
										m: 1,
										width: "10ch",
										backgroundColor: "white",
									}}
								></TextField>
							</Grid2>
					  ))
					: null}
			</Grid2>
			<Grid2 container sx={{ justifyContent: "center" }}>
				{chosenSiteId !== null ? (
					<>
						<Button
							id="validation-button"
							variant="contained"
							onClick={() => {
								axios.post(
									baseURL + "/api/value-equipment-building/updateAll",
									valuesEquipmentBuilding
								);
								axios.post(
									baseURL + "/api/value-equipment-site/updateAll",
									valuesEquipmentSite
								);
								setOpen(true);
							}}
						>
							Valider les modifications
						</Button>
						<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
							<Alert
								onClose={handleClose}
								severity="success"
								sx={{ width: "100%" }}
							>
								Modifications enregistrées !
							</Alert>
						</Snackbar>
					</>
				) : null}
			</Grid2>
		</>
	);
};

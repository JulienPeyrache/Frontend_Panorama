import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import { baseURL } from "../components/Const";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Snackbar, Alert, Checkbox } from "@mui/material";
import FilterBar from "../components/FilterBar";
import "./ManagerEquipment.css";
import { Building, ValueEquipmentBuilding } from "../interfaces/entities";

export const ManagerEquipment = (): React.ReactElement => {
	const [equipments, setEquipments] = useState<any[]>([]);
	const [checkedEquipments, setCheckedEquipments] = useState<boolean[]>([]);
	const [buildings, setBuildings] = useState<any[]>([]);
	const [chosenBuildingName, setChosenBuildingName] = useState<any>(null);
	const [valuesEquipmentBuilding, setValuesEquipmentBuilding] = useState<any[]>(
		[]
	);
	const [open, setOpen] = useState(false);

	const handleCheck = (
		event: React.ChangeEvent<HTMLInputElement>,
		i: number
	) => {
		setCheckedEquipments(
			checkedEquipments.map((bool, idx) =>
				idx === i ? event.target.checked : bool
			)
		);
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

		axios.get(baseURL + "/api/building").then((res) => setBuildings(res.data));
	}, []);

	useEffect(() => {
		if (chosenBuildingName !== null) {
			const buildingId = buildings.find(
				(building) => building.name_building === chosenBuildingName
			).id;
			axios
				.get(
					baseURL +
						"/api/value-equipment-building/findByBuildingId/" +
						buildingId
				)
				.then((res) =>
					setValuesEquipmentBuilding(
						equipments.map((equipment) =>
							res.data.some(
								(valueEquipmentBuilding: ValueEquipmentBuilding) =>
									valueEquipmentBuilding.equipmentId === equipment.id
							)
								? res.data.find(
										(valueEquipmentBuilding: ValueEquipmentBuilding) =>
											valueEquipmentBuilding.equipmentId === equipment.id
								  )
								: {
										equipmentId: equipment.id,
										buildingId: buildingId,
										description: "",
								  }
						)
					)
				);

			setCheckedEquipments(
				equipments.map(
					(equipment) =>
						valuesEquipmentBuilding.find(
							(valueEquipmentBuilding) => valueEquipmentBuilding.id
						) !== undefined
				)
			);
		} else {
			setValuesEquipmentBuilding([]);
		}
	}, [chosenBuildingName]);

	return (
		<>
			<FilterBar
				label="Choisir un bâtiment..."
				liste={buildings.map((building: Building) => building.name_building)}
				value={chosenBuildingName}
				onChange={(event: any, newValue: string | null) => {
					setChosenBuildingName(newValue);
				}}
			/>
			<h2>{chosenBuildingName}</h2>
			<Grid2
				container
				spacing={2}
				sx={{ color: "black", justifyContent: "center" }}
			>
				{chosenBuildingName !== null
					? equipments.map((equipment, i) => (
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
									}}
								>
									{equipment.label_equipment}
								</Item>
								<Checkbox
									checked={checkedEquipments[i]}
									onChange={(event) => {
										handleCheck(event, i);
									}}
									sx={{
										color: "#26367a",
										"&.Mui-checked": {
											color: "#26367a",
										},
									}}
								/>
								{checkedEquipments[i] ? (
									<Item>
										<TextField
											value={
												valuesEquipmentBuilding.find(
													(value) => value.equipmentId === equipment.id
												)?.description
											}
											onChange={(
												event: React.ChangeEvent<HTMLInputElement>
											) => {
												setValuesEquipmentBuilding(
													valuesEquipmentBuilding.map((value) =>
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
									</Item>
								) : null}
							</Grid2>
					  ))
					: null}
			</Grid2>
			<Grid2 container sx={{ justifyContent: "center" }}>
				{chosenBuildingName !== null ? (
					<>
						<Button
							id="validation-button"
							variant="contained"
							onClick={() => {
								axios.post(
									baseURL + "/api/value-equipment-building/updateAll",
									valuesEquipmentBuilding
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

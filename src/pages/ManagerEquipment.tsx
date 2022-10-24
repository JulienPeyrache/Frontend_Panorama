import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import { baseURL } from "../assets/Const";
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
	const [open, setOpen] = useState<boolean>(false);
	const [start, setStart] = useState<boolean>(false);

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

	const handleValidation = () => {
		const values = valuesEquipmentBuilding.filter(
			(value, i) => checkedEquipments[i]
		);
		axios.post(baseURL + "/api/value-equipment-building/updateAll", values);

		const ancientValues = valuesEquipmentBuilding.filter(
			(value, i) => !checkedEquipments[i] && value.id !== undefined
		);
		axios.post(
			baseURL + "/api/value-equipment-building/deleteAll",
			ancientValues
		);

		setOpen(true);
	};

	useEffect(() => {
		axios
			.get(baseURL + "/api/equipment")
			.then((res) => setEquipments(res.data));

		axios
			.get(baseURL + "/api/building/sortedByName")
			.then((res) => setBuildings(res.data));
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
		} else {
			setValuesEquipmentBuilding([]);
			setStart(false);
		}
	}, [chosenBuildingName]);

	useEffect(() => {
		if (valuesEquipmentBuilding.length > 0 && !start) {
			setStart(true);
			setCheckedEquipments(
				equipments.map(
					(equipment, i) => valuesEquipmentBuilding[i].id !== undefined
				)
			);
		}
	}, [valuesEquipmentBuilding]);

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
				sx={{
					color: "black",
					justifyContent: "center",
					"--Grid-borderWidth": "1px",
					"& > div": {
						borderRight: "var(--Grid-borderWidth) solid",
						borderBottom: "var(--Grid-borderWidth) solid",
						borderTop: "var(--Grid-borderWidth) solid",
						borderLeft: "var(--Grid-borderWidth) solid",
						borderColor: "divider",
					},
					marginLeft: "4%",
					marginRight: "4%",
				}}
			>
				{checkedEquipments.length > 0
					? equipments.map((equipment, i) => {
							return (
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
										key={equipment.id}
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
									<Item>
										<TextField
											value={valuesEquipmentBuilding[i].description}
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
								</Grid2>
							);
					  })
					: null}
			</Grid2>
			<Grid2 container sx={{ justifyContent: "center" }}>
				{chosenBuildingName !== null ? (
					<>
						<Button
							id="validation-button"
							variant="contained"
							onClick={handleValidation}
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

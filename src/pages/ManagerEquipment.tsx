import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import { baseURL } from "../components/Const";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import FilterBar from "../components/FilterBar";

export const ManagerEquipment = (): React.ReactElement => {
	const [equipments, setEquipments] = useState<any[]>([]);
	const [sites, setSites] = useState<any[]>([]);
	const [buildings, setBuildings] = useState<any[]>([]);
	const [chosenBuilding, setChosenBuilding] = useState<any>(null);
	const [valuesEquipmentBuilding, setValuesEquipmentBuilding] = useState<
		any[]
	>([]);

	axios
		.get(baseURL + "/api/equipment")
		.then((res) => setEquipments(res.data));

	axios.get(baseURL + "/api/building").then((res) => setBuildings(res.data));

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
		}
	}, [chosenBuilding]);

	return (
		<>
			<FilterBar
				label="Choisir un bâtiment..."
				liste={buildings.map((building) => building.name_building)}
				value={chosenBuilding}
				onChange={(event: any, newValue: string | null) => {
					setChosenBuilding(newValue);
				}}
			/>
			<h1>{chosenBuilding}</h1>
			<Grid2
				container
				spacing={2}
				sx={{ color: "black", justifyContent: "center" }}
			>
				{equipments.map((equipment) => (
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
						<TextField
							value={
								valuesEquipmentBuilding[equipment.id - 1]
									? valuesEquipmentBuilding[equipment.id - 1]
											.description
									: ""
							}
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => {
								setValuesEquipmentBuilding(
									valuesEquipmentBuilding.map((value) =>
										value.equipmentId === equipment.id
											? {
													...value,
													description:
														event.target.value,
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
				))}
			</Grid2>
		</>
	);
};

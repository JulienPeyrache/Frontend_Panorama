import "./ManagerService.css";
import { useEffect, useState } from "react";
import { baseURL } from "../components/Const";
import FilterBar from "../components/FilterBar";
import axios from "axios";
import { Building, ValueItemBuilding } from "../interfaces/entities";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
	Alert,
	Button,
	Checkbox,
	Snackbar,
	Switch,
	TextField,
} from "@mui/material";

export const ManagerService = (): React.ReactElement => {
	const [buildings, setBuildings] = useState<any[]>([]);
	const [services, setServices] = useState<any[]>([]);
	const [chosenBuildingName, setChosenBuildingName] = useState<any>(null);
	const [chosenBuildingId, setChosenBuildingId] = useState<any>(null);
	const [chosenServiceId, setChosenServiceId] = useState<any>(null);
	const [items, setItems] = useState<any[]>([]);
	const [commonItems, setCommonItems] = useState<any[]>([]);
	const [specificItems, setSpecificItems] = useState<any[]>([]);
	const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
	const [valuesItemBuilding, setValuesItemBuilding] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [start, setStart] = useState<boolean>(false);
	const [attachedServices, setAttachedServices] = useState<any[]>([]);
	const [checkedAttachedServices, setCheckedAttachedServices] = useState<
		boolean[]
	>([]);
	const [ancientCheckedAttachedServices, setAncientCheckedAttachedServices] =
		useState<boolean[]>([]);
	const [isSpecificReset, setIsSpecificReset] = useState<boolean>(false);

	const handleCheck = (
		event: React.ChangeEvent<HTMLInputElement>,
		i: number
	) => {
		setCheckedItems(
			checkedItems.map((bool, idx) => (idx === i ? event.target.checked : bool))
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

	const handleSwitch = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		setCheckedAttachedServices(
			checkedAttachedServices.map((bool, i) => (index === i ? !bool : bool))
		);
	};

	const handleValidation = () => {
		console.log(checkedAttachedServices);
		let values = valuesItemBuilding.filter((value, i) => checkedItems[i]);
		let ancientValues = valuesItemBuilding.filter(
			(value, i) => !checkedItems[i] && value.id !== undefined
		);

		for (const item of specificItems) {
			const isAttached =
				checkedAttachedServices[
					attachedServices.indexOf(
						attachedServices.find(
							(attachedService) => attachedService.id === item.attachedServiceId
						)
					)
				];
			if (!isAttached) {
				const valueToDelete = values.find((value) => value.itemId === item.id);
				if (valueToDelete !== undefined) {
					values.splice(values.indexOf(valueToDelete), 1);
					ancientValues.push(valueToDelete);
				}
			}
		}

		axios.post(baseURL + "/api/value-item-building/updateAll", values);
		axios.post(baseURL + "/api/value-item-building/deleteAll", ancientValues);

		const newAttachedServices = attachedServices.filter(
			(_, i) => checkedAttachedServices[i] && !ancientCheckedAttachedServices[i]
		);
		axios.post(
			baseURL + "/api/attached-service/addAllToBuilding/" + chosenBuildingId,
			newAttachedServices
		);

		const deletedAttachedServices = attachedServices.filter(
			(_, i) => !checkedAttachedServices[i] && ancientCheckedAttachedServices[i]
		);
		axios.post(
			baseURL +
				"/api/attached-service/deleteAllFromBuilding/" +
				chosenBuildingId,
			deletedAttachedServices
		);

		setOpen(true);
	};

	useEffect(() => {
		axios.get(baseURL + "/api/building").then((res) => setBuildings(res.data));

		axios.get(baseURL + "/api/service").then((res) => setServices(res.data));
	}, []);

	useEffect(() => {
		if (chosenBuildingName !== null) {
			setChosenBuildingId(
				buildings.find(
					(building) => building.name_building === chosenBuildingName
				).id
			);
		}
	}, [chosenBuildingName]);

	useEffect(() => {
		if (chosenServiceId !== null) {
			axios
				.get(baseURL + "/api/item/findCommonByServiceId/" + chosenServiceId)
				.then((res) => setCommonItems(res.data));

			axios
				.get(baseURL + "/api/item/findSpecificByServiceId/" + chosenServiceId)
				.then((res) => setSpecificItems(res.data));

			axios
				.get(
					baseURL + "/api/attached-service/findByServiceId/" + chosenServiceId
				)
				.then((res) => setAttachedServices(res.data));
		}
	}, [chosenServiceId]);

	useEffect(() => {
		if (attachedServices.length > 0) {
			axios
				.post(
					baseURL + "/api/attached-service/areOnBuilding/" + chosenBuildingId,
					attachedServices
				)
				.then((res) => {
					setCheckedAttachedServices(res.data);
					setAncientCheckedAttachedServices(res.data);
				});
		}
	}, [attachedServices]);

	useEffect(() => {
		if (
			commonItems.length > 0 &&
			specificItems.length > 0 &&
			attachedServices.length > 0
		) {
			const items = commonItems.concat(specificItems);
			setItems(items);
			axios
				.get(
					baseURL +
						"/api/value-item-building/findByBuildingId/" +
						chosenBuildingId
				)
				.then((res) =>
					setValuesItemBuilding(
						items.map((item) =>
							res.data.some(
								(valueItemBuilding: ValueItemBuilding) =>
									valueItemBuilding.itemId === item.id
							)
								? res.data.find(
										(valueItemBuilding: ValueItemBuilding) =>
											valueItemBuilding.itemId === item.id
								  )
								: {
										itemId: item.id,
										buildingId: chosenBuildingId,
										description: "",
								  }
						)
					)
				);
		} else {
			setValuesItemBuilding([]);
			setStart(false);
		}
	}, [commonItems, specificItems, attachedServices]);

	useEffect(() => {
		if (valuesItemBuilding.length > 0 && !start) {
			setStart(true);
			setCheckedItems(
				items.map((item, i) => valuesItemBuilding[i].id !== undefined)
			);
		}
	}, [valuesItemBuilding]);

	// useEffect(() => {
	// 	setSpecificItems([]);
	// 	setIsSpecificReset(true);
	// }, [checkedAttachedServices]);

	// useEffect(() => {
	// 	if (specificItems.length === 0) {
	// 		for (let i = 0; i < checkedAttachedServices.length; i++) {
	// 			if (checkedAttachedServices[i]) {
	// 				axios
	// 					.get(
	// 						baseURL +
	// 							"/api/item/findByAttachedServiceId/" +
	// 							attachedServices[i].id
	// 					)
	// 					.then((res) => setSpecificItems(specificItems.concat(res.data)));
	// 			}
	// 		}
	// 	}
	// 	setIsSpecificReset(false);
	// }, [isSpecificReset]);

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
			{chosenBuildingId && (
				<FilterBar
					label="Choisir un service..."
					liste={services.map(
						(service) =>
							service.label_service + " (" + service.code_service + ")"
					)}
					onChange={(event: any, newValue: string | null) => {
						setChosenServiceId(
							services.find(
								(service) =>
									service.code_service === newValue?.split(" (")[1].slice(0, -1)
							).id
						);
					}}
				/>
			)}
			{chosenServiceId && (
				<>
					<h2>Informations communes</h2>
					<Grid2
						container
						spacing={2}
						sx={{
							"--Grid-borderWidth": "1px",
							borderTop: "var(--Grid-borderWidth) solid",
							borderLeft: "var(--Grid-borderWidth) solid",
							borderColor: "divider",
							"& > div": {
								borderRight: "var(--Grid-borderWidth) solid",
								borderBottom: "var(--Grid-borderWidth) solid",
								borderColor: "divider",
							},
							color: "black",
							marginLeft: "4%",
							marginRight: "4%",
						}}
					>
						<Grid2
							xs={8}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								color: "blue",
							}}
						>
							Libellé
						</Grid2>
						<Grid2
							xs={0.7}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								color: "blue",
							}}
						>
							Oui/Non
						</Grid2>
						<Grid2
							xs={3.3}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								color: "blue",
							}}
						>
							Détails supplémentaires (facultatif)
						</Grid2>
						{checkedItems.length > 0
							? commonItems.map((item) => (
									<>
										<Grid2
											key={"label" + item.id}
											xs={8}
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											{item.label_item}
										</Grid2>
										<Grid2
											key={"value" + item.id}
											xs={4}
											sx={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Checkbox
												key={"check" + item.id}
												checked={checkedItems[items.indexOf(item)]}
												onChange={(event) => {
													handleCheck(event, items.indexOf(item));
												}}
												sx={{
													color: "#26367a",
													"&.Mui-checked": {
														color: "#26367a",
													},
												}}
											/>
											<TextField
												key={"textfield" + item.id}
												value={
													valuesItemBuilding.find(
														(value) => value.itemId === item.id
													)?.description
												}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													setValuesItemBuilding(
														valuesItemBuilding.map((value) =>
															value.itemId === item.id
																? {
																		...value,
																		description: event.target.value,
																  }
																: value
														)
													);
												}}
												sx={{
													display: "flex",
													justifyContent: "center",
													width: "80%",
													m: 1,
													backgroundColor: "white",
												}}
											></TextField>
										</Grid2>
									</>
							  ))
							: null}
					</Grid2>
					<h2>Services rattachés</h2>
					<Grid2
						container
						spacing={2}
						sx={{
							"--Grid-borderWidth": "1px",
							borderTop: "var(--Grid-borderWidth) solid",
							borderColor: "divider",
							"& > div": {
								borderBottom: "var(--Grid-borderWidth) solid",
								borderColor: "divider",
							},
							color: "black",
							marginLeft: "4%",
							marginRight: "4%",
						}}
					>
						{checkedAttachedServices.length > 0
							? attachedServices.map((attachedService) => (
									<>
										<Grid2
											key={"label" + attachedService.id}
											xs={8}
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											{attachedService.label_attached_service}
										</Grid2>
										<Grid2 key={"checked" + attachedService.id} xs={4}>
											<Switch
												key={"switch" + attachedService.id}
												checked={
													checkedAttachedServices[
														attachedServices.indexOf(attachedService)
													]
												}
												onChange={(e) =>
													handleSwitch(
														e,
														attachedServices.indexOf(attachedService)
													)
												}
												inputProps={{ "aria-label": "controlled" }}
											/>
										</Grid2>
									</>
							  ))
							: null}
					</Grid2>
					{checkedAttachedServices.includes(true) ? (
						<>
							<h2>Informations spécifiques service rattaché</h2>
							<Grid2
								container
								spacing={2}
								sx={{
									"--Grid-borderWidth": "1px",
									borderTop: "var(--Grid-borderWidth) solid",
									borderLeft: "var(--Grid-borderWidth) solid",
									borderColor: "divider",
									"& > div": {
										borderRight: "var(--Grid-borderWidth) solid",
										borderBottom: "var(--Grid-borderWidth) solid",
										borderColor: "divider",
									},
									color: "black",
									marginLeft: "4%",
									marginRight: "4%",
								}}
							>
								<Grid2
									xs={8}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										color: "blue",
									}}
								>
									Libellé
								</Grid2>
								<Grid2
									xs={0.7}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										color: "blue",
									}}
								>
									Oui/Non
								</Grid2>
								<Grid2
									xs={3.3}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										color: "blue",
									}}
								>
									Détails supplémentaires (facultatif)
								</Grid2>
								{checkedItems.length > 0
									? specificItems.map((item) =>
											checkedAttachedServices[
												attachedServices.indexOf(
													attachedServices.find(
														(attachedService) =>
															attachedService.id === item.attachedServiceId
													)
												)
											] ? (
												<>
													<Grid2
														key={"label" + item.id}
														xs={8}
														sx={{
															display: "flex",
															flexDirection: "column",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														{item.label_item}
													</Grid2>
													<Grid2
														key={"value" + item.id}
														xs={4}
														sx={{
															display: "flex",
															justifyContent: "center",
														}}
													>
														<Checkbox
															key={"check" + item.id}
															checked={checkedItems[items.indexOf(item)]}
															onChange={(event) => {
																handleCheck(event, items.indexOf(item));
															}}
															sx={{
																color: "#26367a",
																"&.Mui-checked": {
																	color: "#26367a",
																},
															}}
														/>
														<TextField
															key={"textfield" + item.id}
															value={
																valuesItemBuilding.find(
																	(value) => value.itemId === item.id
																)?.description
															}
															onChange={(
																event: React.ChangeEvent<HTMLInputElement>
															) => {
																setValuesItemBuilding(
																	valuesItemBuilding.map((value) =>
																		value.itemId === item.id
																			? {
																					...value,
																					description: event.target.value,
																			  }
																			: value
																	)
																);
															}}
															sx={{
																display: "flex",
																justifyContent: "center",
																width: "80%",
																m: 1,
																backgroundColor: "white",
															}}
														></TextField>
													</Grid2>
												</>
											) : null
									  )
									: null}
							</Grid2>
						</>
					) : null}
				</>
			)}
			<Grid2 container sx={{ justifyContent: "center" }}>
				{chosenBuildingId !== null ? (
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

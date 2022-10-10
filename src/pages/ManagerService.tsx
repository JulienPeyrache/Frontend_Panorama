import "./ManagerService.css";
import { useEffect, useState } from "react";
import { baseURL } from "../components/Const";
import FilterBar from "../components/FilterBar";
import axios from "axios";
import { Building, Site } from "../interfaces/entities";
import Grid2 from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import { Alert, Button, Snackbar, Switch, TextField } from "@mui/material";

export const ManagerService = (): React.ReactElement => {
	const [sites, setSites] = useState<any[]>([]);
	const [buildings, setBuildings] = useState<any[]>([]);
	const [services, setServices] = useState<any[]>([]);
	const [chosenSiteId, setChosenSiteId] = useState<any>(null);
	const [chosenServiceId, setChosenServiceId] = useState<any>(null);
	const [commonItems, setCommonItems] = useState<any[]>([]);
	const [valuesItemSite, setValuesItemSite] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [attachedServices, setAttachedServices] = useState<any[]>([]);
	const [checkedAttachedServices, setCheckedAttachedServices] = useState<
		boolean[]
	>([]);
	const [specificItems, setSpecificItems] = useState<any[]>([]);
	const [isSpecificReset, setIsSpecificReset] = useState<boolean>(false);

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

	const handleSwitch = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		setCheckedAttachedServices(
			checkedAttachedServices.map((bool, i) => (index === i ? !bool : bool))
		);
	};

	useEffect(() => {
		axios.get(baseURL + "/api/site").then((res) => setSites(res.data));

		axios
			.post(baseURL + "/api/site/listBuildingsLinked")
			.then((res) => setBuildings(res.data));

		axios.get(baseURL + "/api/service").then((res) => setServices(res.data));
	}, []);

	useEffect(() => {
		if (chosenSiteId !== null) {
			axios
				.get(baseURL + "/api/value-item-site/findBySiteId/" + chosenSiteId)
				.then((res) => setValuesItemSite(valuesItemSite.concat(res.data)));
		}
	}, [chosenSiteId]);

	useEffect(() => {
		if (chosenServiceId !== null) {
			axios
				.get(
					baseURL +
						"/api/attached-service/findByServiceAndLabel/" +
						chosenServiceId +
						"/Commun"
				)
				.then((res) =>
					axios.get(
						baseURL + "/api/item/findByAttachedServiceId/" + res.data.id
					)
				)
				.then((res) => setCommonItems(res.data));

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
					baseURL + "/api/attached-service/areOnSite/" + chosenSiteId,
					attachedServices
				)
				.then((res) => setCheckedAttachedServices(res.data));
		}
	}, [attachedServices]);

	useEffect(() => {
		setSpecificItems([]);
		setIsSpecificReset(true);
	}, [checkedAttachedServices]);

	useEffect(() => {
		if (specificItems.length === 0) {
			for (let i = 0; i < checkedAttachedServices.length; i++) {
				if (checkedAttachedServices[i]) {
					axios
						.get(
							baseURL +
								"/api/item/findByAttachedServiceId/" +
								attachedServices[i].id
						)
						.then((res) => setSpecificItems(specificItems.concat(res.data)));
				}
			}
		}
		setIsSpecificReset(false);
	}, [isSpecificReset]);

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
				onChange={(event: any, newValue: string | null) => {
					setChosenSiteId(newValue?.split(" -- ")[1].slice(1, -1));
				}}
			/>
			{chosenSiteId && (
				<FilterBar
					label="Choisir un service..."
					liste={
						services.length
							? services.map(
									(service) =>
										service.label_service + " (" + service.code_service + ")"
							  )
							: []
					}
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
						{commonItems.map((item) => (
							<>
								<Grid2
									key={item.id}
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
									xs={4}
									sx={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<TextField
										value={
											valuesItemSite.find((value) => value.itemId === item.id)
												.description
										}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											setValuesItemSite(
												valuesItemSite.map((value) =>
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
						))}
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
						{attachedServices.map((attachedService) => (
							<>
								<Grid2
									xs={8}
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{attachedService.label_attached_service}
								</Grid2>
								<Grid2 xs={4}>
									<Switch
										checked={
											checkedAttachedServices[
												attachedServices.indexOf(attachedService)
											]
										}
										onChange={(e) =>
											handleSwitch(e, attachedServices.indexOf(attachedService))
										}
										inputProps={{ "aria-label": "controlled" }}
									/>
								</Grid2>
							</>
						))}
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
								{specificItems.map((item) => (
									<>
										<Grid2
											key={item.id}
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
											xs={4}
											sx={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											<TextField
												value={
													valuesItemSite.find(
														(value) => value.itemId === item.id
													).description
												}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													setValuesItemSite(
														valuesItemSite.map((value) =>
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
								))}
							</Grid2>
						</>
					) : null}
				</>
			)}
			<Grid2 container sx={{ justifyContent: "center" }}>
				{chosenSiteId !== null ? (
					<>
						<Button
							id="validation-button"
							variant="contained"
							onClick={() => {
								axios.post(
									baseURL + "/api/value-item-site/updateAll",
									valuesItemSite
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

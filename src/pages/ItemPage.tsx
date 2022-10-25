import { Grid } from "@mui/material";
import { Divider, Typography } from "@mui/material";
import "./ItemPage.css";
import SimpleItem from "../components/SimpleItem";
import ButtonItem from "../components/ButtonItem";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";
import { useEffect, useState } from "react";
import { Building, Redirection } from "../interfaces/entities";
import { baseURL } from "../assets/Const";
import axios from "axios";

interface ItemPageProps {
	setValueItemPage: (value: number) => void;
	step: string;
}

export const ItemPage = ({
	setValueItemPage,
	step,
}: ItemPageProps): React.ReactElement => {
	const [items, setItems] = useState<any[]>([]);
	const [equipments, setEquipments] = useState<any[]>([]);
	const [redirections, setRedirections] = useState<Redirection[]>([]);
	const [building, setBuilding] = useState<Building | null>(
		JSON.parse(localStorage.getItem("building") || "{}")
	);

	useEffect(() => {
		const onStorage = () => {
			setBuilding(JSON.parse(localStorage.getItem("building") || "{}"));
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	useEffect(() => {
		if (building !== null) {
			axios
				.get(baseURL + "/api/redirection/findByStep/" + step)
				.then((response) => setRedirections(response.data));

			axios
				.get(
					baseURL +
						"/api/equipment/findByStep/" +
						step +
						"/inBuilding/" +
						building.id
				)
				.then((response) => setEquipments(response.data));

			axios
				.get(
					baseURL +
						"/api/item/findByStep/" +
						step +
						"/inBuilding/" +
						building.id
				)
				.then((response) => setItems(response.data));
		}
	}, [building]);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<div>
					<BackButton onClick={() => setValueItemPage(0)} />
					<Typography variant="h3" align="center" sx={{ m: 1 }}>
						<b>{step}</b>
					</Typography>
				</div>
				<Divider orientation="horizontal" />
				<Grid
					container
					padding={2}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					{redirections.length > 0 &&
						redirections.map((redirection) => (
							<ButtonItem
								key={redirection.id}
								label={redirection.label}
								handleClick={() => window.open(redirection.url)}
							/>
						))}
					{equipments.length > 0 &&
						equipments.map((equipment) => (
							<SimpleItem
								key={equipment.id}
								label={equipment.label_equipment}
								description={equipment.description}
							/>
						))}
					{items.length > 0 &&
						items.map((item) => (
							<SimpleItem
								key={item.id}
								label={
									item.label_userfriendly
										? item.label_userfriendly
										: item.label_item
								}
								description={item.description}
							/>
						))}
				</Grid>
			</div>
		</ThemeProvider>
	);
};

export const ItemPageBis = (step: { step: string }): React.ReactElement => {
	const [items, setItems] = useState<any[]>([]);
	const [equipments, setEquipments] = useState<any[]>([]);
	const [redirections, setRedirections] = useState<Redirection[]>([]);
	const [building, setBuilding] = useState<Building | null>(
		JSON.parse(localStorage.getItem("building") || "{}")
	);

	useEffect(() => {
		const onStorage = () => {
			setBuilding(JSON.parse(localStorage.getItem("building") || "{}"));
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	useEffect(() => {
		if (building !== null) {
			axios
				.get(baseURL + "/api/redirection/findByStep/" + step.step)
				.then((response) => setRedirections(response.data));

			axios
				.get(
					baseURL +
						"/api/equipment/findByStep/" +
						step.step +
						"/inBuilding/" +
						building.id
				)
				.then((response) => setEquipments(response.data));

			axios
				.get(
					baseURL +
						"/api/item/findByStep/" +
						step +
						"/inBuilding/" +
						building.id
				)
				.then((response) => setItems(response.data));
		}
	}, [building]);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<div>
					<Typography variant="h3" align="center" sx={{ m: 1 }}>
						<b>{step.step}</b>
					</Typography>
				</div>
				<Divider orientation="horizontal" />
				<Grid
					container
					padding={2}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					{redirections.length > 0 &&
						redirections.map((redirection) => (
							<ButtonItem
								key={redirection.id}
								label={redirection.label}
								handleClick={() => window.open(redirection.url)}
							/>
						))}
					{equipments.length > 0 &&
						equipments.map((equipment) => (
							<SimpleItem
								key={equipment.id}
								label={equipment.label_equipment}
								description={equipment.description}
							/>
						))}
					{items.length > 0 &&
						items.map((item) => (
							<SimpleItem
								key={item.id}
								label={
									item.label_userfriendly
										? item.label_userfriendly
										: item.label_item
								}
								description={item.description}
							/>
						))}
				</Grid>
			</div>
		</ThemeProvider>
	);
};

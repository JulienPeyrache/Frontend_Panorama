import { ActionAreaCard } from "../components/ActionCard";
import React from "react";
import { Grid } from "@mui/material";
import restauration from "../assets/restauration.jpg";
import intervention from "../assets/intervention.jpg";
import travail from "../assets/travail.jpg";
import commodities from "../assets/commodités.jpg";
import { HeaderBar } from "../components/HeaderBar";

export interface ActionCardProps {
	name_card: string;
	image_card: string;
	description_card: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Restauration: ActionCardProps = {
	name_card: "Restauration",
	image_card: restauration,
	description_card: "Trouvez un restaurant",
	handleClick: () => {
		console.log("Restauration");
	},
};

export const Commodites: ActionCardProps = {
	name_card: "Commodités",
	image_card: commodities,
	description_card: "Trouvez une pharmacie",
	handleClick: () => {
		window.location.href = "/step";
	},
};

export const Travail: ActionCardProps = {
	name_card: "Travail",
	image_card: travail,
	description_card: "Trouvez un lieu de travail",
	handleClick: () => {
		console.log("Travail");
	},
};

export const Intervention: ActionCardProps = {
	name_card: "Demande d'intervention",
	image_card: intervention,
	description_card: "Faites une demande d'intervention",
	handleClick: () => {
		console.log("Demande d'intervention");
	},
};

export const TabUserHome = () => {
	return (
		<>
			<HeaderBar />
			<Grid
				container
				mt={10}
				sx={{
					color: "black",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<ActionAreaCard {...Restauration} />
				<ActionAreaCard {...Commodites} />
				<ActionAreaCard {...Travail} />
				<ActionAreaCard {...Intervention} />
			</Grid>
		</>
	);
};

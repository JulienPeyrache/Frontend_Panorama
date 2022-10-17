import { ActionAreaCard } from "../components/ActionCard";
import React from "react";
import { Grid } from "@mui/material";
import restauration from "../assets/restauration.jpg";
import intervention from "../assets/intervention.jpg";
import travail from "../assets/travail.jpg";
import commodities from "../assets/commoditiés.jpg";

export interface ActionCardProps {
	name_card: string;
	image_card: string;
	description_card: string;
	handleCLick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Restauration: ActionCardProps = {
	name_card: "Restauration",
	image_card: "restauration",
	description_card: "Trouvez un restaurant",
	handleCLick: () => {
		console.log("Restauration");
	},
};

export const Commodites: ActionCardProps = {
	name_card: "Commodités",
	image_card: "commodities",
	description_card: "Trouvez une pharmacie",
	handleCLick: () => {
		console.log("Commodités");
	},
};

export const Travail: ActionCardProps = {
	name_card: "Travail",
	image_card: "travail",
	description_card: "Trouvez un lieu de travail",
	handleCLick: () => {
		console.log("Travail");
	},
};

export const Intervention: ActionCardProps = {
	name_card: "Demande d'Intervention ou Signalement",
	image_card: "intervention",
	description_card: "Faites une demande d'intervention ou un signalement",
	handleCLick: () => {
		console.log("Demande d'Intervention ou Signalement");
	},
};

export const TabUserHome = () => {
	return (
		<Grid
			container
			padding={2}
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
			}}
		>
			<ActionAreaCard {...Restauration} />
			<ActionAreaCard {...Commodites} />
			<ActionAreaCard {...Travail} />
			<ActionAreaCard {...Intervention} />
		</Grid>
	);
};

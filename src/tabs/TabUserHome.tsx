import { ActionAreaCard } from "../components/ActionCard";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import restauration from "../assets/restauration.jpg";
import intervention from "../assets/intervention.jpg";
import travail from "../assets/travail.jpg";
import commodities from "../assets/commodités.jpg";
import StepPage from "../pages/StepPage";

export interface ActionCardProps {
	name_card: string;
	image_card: string;
	description_card: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const TabUserHome = () => {
	const Restauration: ActionCardProps = {
		name_card: "Restauration",
		image_card: restauration,
		description_card: "",
		handleClick: () => {
			setStepPage(1);
		},
	};

	const Commodites: ActionCardProps = {
		name_card: "Commodités",
		image_card: commodities,
		description_card: "",
		handleClick: () => {
			setStepPage(2);
		},
	};

	const Travail: ActionCardProps = {
		name_card: "Outils de travail",
		image_card: travail,
		description_card: "",
		handleClick: () => {
			setStepPage(3);
		},
	};

	const Intervention: ActionCardProps = {
		name_card: "Signalisation & Demande d'intervention",
		image_card: intervention,
		description_card: "",
		handleClick: () => {
			setStepPage(4);
		},
	};
	const [stepPage, setStepPage] = useState(0);
	return (
		<>
			<Grid
				container
				sx={{
					color: "black",
					display: "flex",
					justifyContent: "center",
				}}
			>
				{stepPage === 0 && (
					<>
						<span style={{ marginTop: "15%", width: "100%" }}></span>
						<ActionAreaCard {...Restauration} />
						<ActionAreaCard {...Commodites} />
						<ActionAreaCard {...Travail} />
						<ActionAreaCard {...Intervention} />
					</>
				)}

				{stepPage === 1 && <StepPage />}
				{stepPage === 2 && <StepPage />}
				{stepPage === 3 && <StepPage />}
				{stepPage === 4 && <StepPage />}
			</Grid>
		</>
	);
};

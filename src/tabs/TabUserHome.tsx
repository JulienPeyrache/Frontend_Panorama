import { ActionAreaCard } from "../components/ActionCard";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import restauration from "../assets/restauration.jpg";
import intervention from "../assets/intervention.jpg";
import work from "../assets/travail.jpg";
import comfort from "../assets/commodités.jpg";
import StepPage from "../pages/StepPage";
import { ActionCardProps } from "../components/ActionCard";

export const TabUserHome = () => {
	const Restauration: ActionCardProps = {
		name_card: "Restauration",
		image_card: restauration,
		handleClick: () => {
			setValueStepPage(1);
		},
	};

	const Comfort: ActionCardProps = {
		name_card: "Commodités",
		image_card: comfort,
		handleClick: () => {
			setValueStepPage(2);
		},
	};

	const Work: ActionCardProps = {
		name_card: "Outils de travail",
		image_card: work,
		handleClick: () => {
			setValueStepPage(3);
		},
	};

	const Intervention: ActionCardProps = {
		name_card: "Signalement & Demande d'intervention",
		image_card: intervention,
		handleClick: () => {
			setValueStepPage(4);
		},
	};
	const [valueStepPage, setValueStepPage] = useState(0);
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
				{valueStepPage === 0 && (
					<>
						<span style={{ marginTop: "10%", width: "100%" }}></span>
						<ActionAreaCard {...Restauration} />
						<ActionAreaCard {...Comfort} />
						<ActionAreaCard {...Work} />
						<ActionAreaCard {...Intervention} />
					</>
				)}

				{valueStepPage === 1 && (
					<StepPage
						valueStepPage={1}
						setValueStepPage={setValueStepPage}
						title={Restauration.name_card}
					/>
				)}
				{valueStepPage === 2 && (
					<StepPage
						valueStepPage={2}
						setValueStepPage={setValueStepPage}
						title={Comfort.name_card}
					/>
				)}
				{valueStepPage === 3 && (
					<StepPage
						valueStepPage={3}
						setValueStepPage={setValueStepPage}
						title={Work.name_card}
					/>
				)}
				{valueStepPage === 4 && (
					<StepPage
						valueStepPage={4}
						setValueStepPage={setValueStepPage}
						title={Intervention.name_card}
					/>
				)}
			</Grid>
		</>
	);
};

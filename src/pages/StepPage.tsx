import { Grid, ThemeProvider, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";
import { StepCard } from "../components/StepCard";
import { ItemPage } from "./ItemPage";

interface StepPageProps {
	valueStepPage: number;
	setValueStepPage: (value: number) => void;
	title: string;
}

const steps: Record<number, string[]> = {
	1: ["Restaurant d'entreprise", "Offre en libre service"],
	2: ["Se détendre", "Services à la personne", "Hygiène"],
	3: [
		"Se déplacer",
		"Organiser une réunion",
		"Organiser un événement",
		"Accueillir des visiteurs",
		"Equipements du bâtiment",
		"Réception et expédition de courrier",
		"Reprographie",
		"Archivage",
		"Déménager et aménager",
	],
	4: [
		"Guichet de support ET",
		"Guichet de support IT",
		"Entretien des extérieurs",
		"Sécurité et sûreté",
	],
};

export default function StepPage({
	valueStepPage,
	setValueStepPage,
	title,
}: StepPageProps): ReactElement {
	const [valueItemPage, setValueItemPage] = useState(0);
	return (
		<>
			{valueItemPage === 0 && (
				<ThemeProvider theme={theme}>
					<div>
						<BackButton onClick={() => setValueStepPage(0)} />
						<Typography variant="h3" align="center" sx={{ m: 1 }}>
							<b>{title}</b>
						</Typography>
					</div>
					<Grid
						container
						padding={2}
						sx={{ display: "flex", justifyContent: "center" }}
					>
						{steps[valueStepPage].map((step: string, i: number) => (
							<StepCard
								title={step}
								handleClick={() => setValueItemPage(i + 1)}
							/>
						))}
					</Grid>
				</ThemeProvider>
			)}
			{steps[valueStepPage].map(
				(step: string, i: number) =>
					valueItemPage === i + 1 && (
						<ItemPage setValueItemPage={setValueItemPage} title={step} />
					)
			)}
			<span style={{ marginTop: "15%", width: "100%" }}></span>
		</>
	);
}

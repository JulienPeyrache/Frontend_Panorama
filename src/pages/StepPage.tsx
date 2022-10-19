import { Grid, ThemeProvider, Typography } from "@mui/material";
import { ReactElement } from "react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";
import { StepCard } from "../components/StepCard";

interface StepPageProps {
	valueStepPage: number;
	setValueStepPage: (value: number) => void;
	title: string;
}

const steps: Record<number, string[]> = {
	1: [],
	2: [],
	3: [
		"Se déplacer",
		"Se réunir et collaborer",
		"Organiser un événement",
		"Accueillir des visiteurs",
		"Imprimer",
	],
	4: [],
};

export default function StepPage({
	valueStepPage,
	setValueStepPage,
	title,
}: StepPageProps): ReactElement {
	return (
		<>
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
					{steps[valueStepPage].map((step: string) => (
						<StepCard
							title={step}
							handleClick={() => (window.location.href = "item-list")}
						/>
					))}
				</Grid>
			</ThemeProvider>
		</>
	);
}

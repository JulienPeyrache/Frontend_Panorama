import { Grid, ThemeProvider, Typography } from "@mui/material";
import { ReactElement } from "react";
import { theme } from "../assets/Theme";

interface StepCardProps {
	title: string;
}

export const StepCard = ({ title }: StepCardProps): ReactElement => {
	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			sx={{
				borderRadius: 2,
				border: 3,
				p: 2,
				m: 1,
				backgroundColor: "#90caf9",
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
			}}
		>
			<ThemeProvider theme={theme}>
				<Typography variant="h5" sx={{ textAlign: "center" }}>
					<b>{title}</b>
				</Typography>
			</ThemeProvider>
		</Grid>
	);
};

export default function StepPage(): ReactElement {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Grid
					container
					padding={2}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<StepCard title="Organiser un événement" />
					<StepCard title="Réserver une salle de réunion" />
					<StepCard title="Se rendre à la gare" />
					<StepCard title="Manger de la soupe" />
					<StepCard title="Réserver un panier" />
					<StepCard title="Pondre un oeuf" />
				</Grid>
			</ThemeProvider>
		</>
	);
}

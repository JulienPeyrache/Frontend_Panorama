import { Grid, ThemeProvider, Typography } from "@mui/material";
import { ReactElement } from "react";
import { theme } from "../assets/Theme";
import { HeaderBar } from "../components/HeaderBar";

interface StepCardProps {
	title: string;
}

export const StepCard = ({ title }: StepCardProps): ReactElement => {
	return (
		<ThemeProvider theme={theme}>
			<Grid
				item
				xs={12}
				sm={6}
				md={4}
				sx={{
					borderRadius: 2,
					p: 2,
					m: 1,
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					flexDirection: "row",
					color: "#505050",
					transition: "0.3s",
					boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
					"&:hover": {
						cursor: "pointer",
						backgroundColor: "lightgray",
						color: "#202020",
					},
				}}
			>
				<Typography variant="h5" sx={{ textAlign: "center" }}>
					<b>{title}</b>
				</Typography>
			</Grid>
		</ThemeProvider>
	);
};

export default function StepPage(): ReactElement {
	return (
		<>
			<ThemeProvider theme={theme}>
				<HeaderBar />
				<Typography variant="h3" align="center" sx={{ m: 2, marginTop: 4 }}>
					<b>Commodités</b>
				</Typography>
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

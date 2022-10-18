import { Grid, ThemeProvider, Typography } from "@mui/material";
import { ReactElement } from "react";
import { theme } from "../assets/Theme";

interface StepCardProps {
	title: string;
	handleClick?: () => void;
}

export const StepCard = ({
	title,
	handleClick,
}: StepCardProps): ReactElement => {
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
				onClick={handleClick}
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
				<Typography variant="h3" align="center" sx={{ m: 2, marginTop: 4 }}>
					<b>Commodités</b>
				</Typography>
				<Grid
					container
					padding={2}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<StepCard title="Se déplacer" />
					<StepCard title="Organiser un événement" />
					<StepCard
						title="Se détendre"
						handleClick={() => (window.location.href = "item-list")}
					/>
					<StepCard title="Accueillir des visiteurs" />
					<StepCard title="Imprimer" />
				</Grid>
			</ThemeProvider>
		</>
	);
}

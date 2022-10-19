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
					color: "white",
					backgroundColor: " #515E95",
					transition: "0.3s",
					boxShadow:
						"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
					"&:hover": {
						cursor: "pointer",
						backgroundColor: "#CFDA49",
						color: "#1E2B62",
					},
				}}
				onClick={handleClick}
			>
				<Typography variant="h5" sx={{ textAlign: "center" }}>
					{title}
				</Typography>
			</Grid>
		</ThemeProvider>
	);
};

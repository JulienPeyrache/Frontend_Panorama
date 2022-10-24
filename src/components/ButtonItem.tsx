import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../assets/Theme";

interface ButtonItemProps {
	label: string;
	buttonText?: string;
	handleClick?: () => void;
}

export default function ButtonItem({
	label,
	buttonText = "Accéder",
	handleClick,
}: ButtonItemProps) {
	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			sx={{
				borderRadius: 8,
				p: 2,
				m: 1,
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
				color: "white",
				backgroundColor: " #515E95",
				transition: "0.2s",
				boxShadow:
					"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
			}}
		>
			<ThemeProvider theme={theme}>
				<div style={{ textAlign: "center", padding: 5 }}>
					<b>{label}</b> :
				</div>

				<Button
					variant="contained"
					sx={{
						backgroundColor: "#cfda49",
						color: "#1E2B62",
						flexShrink: 0,
						"&:hover": {
							backgroundColor: "#e1e78a",
							color: "#131b3e",
						},
					}}
					onClick={handleClick}
				>
					<b>{buttonText}</b>
				</Button>
			</ThemeProvider>
		</Grid>
	);
}

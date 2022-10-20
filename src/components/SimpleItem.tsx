import * as React from "react";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../assets/Theme";

interface SimpleItemProps {
	label: string;
	description: string;
}

export default function SimpleItem({ label, description }: SimpleItemProps) {
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
				flexDirection: "column",
				color: "white",
				backgroundColor: " #515E95",
				transition: "0.3s",
				boxShadow:
					"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
			}}
		>
			<ThemeProvider theme={theme}>
				<div style={{ textAlign: "center" }}>
					<b>{label}</b> :
				</div>
				<div style={{ textAlign: "center" }}>{description}</div>
			</ThemeProvider>
		</Grid>
	);
}

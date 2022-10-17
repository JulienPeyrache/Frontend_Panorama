import * as React from "react";
import { Stack } from "@mui/system";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { theme } from "../assets/Theme";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: theme.palette.text.secondary,
	height: 60,
	lineHeight: "60px",
}));

interface SimpleItemProps {
	label: string;
	description: string;
}

export default function SimpleItem({ label, description }: SimpleItemProps) {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<Item elevation={1}>
					<Stack
						direction="row"
						justifyContent="space-evenly"
						alignItems="center"
						spacing={1}
						sx={{ my: 1, mx: 1 }}
					>
						<div>
							<b>{label}</b> :
						</div>
						<div>{description}</div>
					</Stack>
				</Item>
			</ThemeProvider>
		</div>
	);
}

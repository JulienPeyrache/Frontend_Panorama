import * as React from "react";
import { Stack } from "@mui/system";
import { Paper, Button } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { theme } from "../assets/Theme";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: theme.palette.text.secondary,
	lineHeight: "60px",
}));

interface ButtonItemProps {
	label: string;
	buttonText: string;
	handleClick?: () => void;
}

export default function ButtonItem({
	label,
	buttonText,
	handleClick,
}: ButtonItemProps) {
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
						<Button variant="contained" sx={{ backgroundColor: "#26367a" }}>
							{buttonText}
						</Button>
					</Stack>
				</Item>
			</ThemeProvider>
		</div>
	);
}

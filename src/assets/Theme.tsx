import { createTheme } from "@mui/material";

export const theme = createTheme({
	typography: {
		fontFamily: ["Montserrat", "sans-serif"].join(","),
	},
	palette: {
		primary: {
			main: "#26367a",
		},
		secondary: {
			main: "#505050",
		},
	},
});

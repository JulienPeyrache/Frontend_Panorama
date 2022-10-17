import {
	BottomNavigation,
	BottomNavigationAction,
	ThemeProvider,
	Typography,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import WindowIcon from "@mui/icons-material/Window";
import { useState } from "react";
import { TabUserHome } from "../tabs/TabUserHome";
import "./Home.css";
import { theme } from "../assets/Theme";
import StepPage from "./StepPage";

export const Home = (): React.ReactElement => {
	const [value, setValue] = useState(0);
	return (
		<div>
			<ThemeProvider theme={theme}>
				<div className="tab">
					{value === 0 && <TabUserHome />}
					{value === 1 && <Typography variant="h3">Recherche</Typography>}
					{value === 2 && <Typography variant="h3">Catalogue</Typography>}
					{value === 10 && <StepPage />}
				</div>
				<div className="bottom">
					<BottomNavigation
						showLabels
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
					>
						<BottomNavigationAction label="Accueil" icon={<WindowIcon />} />
						<BottomNavigationAction label="Recherche" icon={<SearchIcon />} />
						<BottomNavigationAction label="Catalogue" icon={<MenuBookIcon />} />
					</BottomNavigation>
				</div>
			</ThemeProvider>
		</div>
	);
};

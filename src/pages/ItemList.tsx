import { Grid } from "@mui/material";
import {
	Divider,
	BottomNavigation,
	BottomNavigationAction,
	Typography,
} from "@mui/material";
import "./ItemList.css";
import SimpleItem from "../components/SimpleItem";
import ButtonItem from "../components/ButtonItem";
import { HeaderBar } from "../components/HeaderBar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import WindowIcon from "@mui/icons-material/Window";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";

export const ItemList = (): React.ReactElement => {
	return (
		<ThemeProvider theme={theme}>
			<div className="item-list">
				<HeaderBar />
				<div>
					<BackButton />
					<Typography variant="h3" align="center" sx={{ m: 1 }}>
						<b>Se déplacer</b>
					</Typography>
				</div>
				<Divider orientation="horizontal" />
				<Grid
					container
					padding={2}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<SimpleItem
						label="Machine à café"
						description="1er étage, au fond du couloir"
					/>
					<SimpleItem label="Salle de repos" description="3e étage" />
					<ButtonItem label="Sauna" buttonText="Réserver" />
				</Grid>
				<div className="bottom">
					<BottomNavigation showLabels>
						<BottomNavigationAction
							label="Accueil"
							icon={<WindowIcon />}
							onClick={() => {
								window.location.href = "/";
							}}
						/>
						<BottomNavigationAction label="Recherche" icon={<SearchIcon />} />
						<BottomNavigationAction label="Catalogue" icon={<MenuBookIcon />} />
					</BottomNavigation>
				</div>
			</div>
		</ThemeProvider>
	);
};

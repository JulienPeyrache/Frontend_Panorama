import { Stack } from "@mui/system";
import {
	Button,
	Box,
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

export const ItemList = (): React.ReactElement => {
	return (
		<ThemeProvider theme={theme}>
			<div className="item-list">
				<HeaderBar />
				{/* <Box sx={{ alignContent: "flex-start" }}>
				<Button href="/">Retour</Button>
			</Box> */}
				<Typography variant="h3" sx={{ m: 3 }}>
					<b>Se détendre</b>
				</Typography>
				<Divider orientation="horizontal" />
				<Stack
					display="flex"
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={0.5}
					sx={{ my: 1, mx: 1 }}
				>
					<SimpleItem
						label="Machine à café"
						description="1er étage, au fond du couloir"
					/>
					<SimpleItem label="Salle de repos" description="3e étage" />
					<ButtonItem label="Sauna" buttonText="Réserver" />
				</Stack>
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

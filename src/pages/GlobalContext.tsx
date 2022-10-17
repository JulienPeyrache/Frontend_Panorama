import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import WindowIcon from "@mui/icons-material/Window";
import { useState } from "react";
import logo from "../assets/logo_macif.png";
import { TabUserHome } from "../tabs/TabUserHome";
import "./GlobalContext.css";

export const NewHome = (): React.ReactElement => {
	const [value, setValue] = useState(0);
	return (
		<div>
			<div className="tab">
				{value === 0 && <TabUserHome />}
				{value === 1 && <h1> Catalogue </h1>}
				{value === 2 && <h1> Recherche </h1>}
			</div>
			<div className="bottom">
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
						console.log(newValue);
					}}
				>
					<BottomNavigationAction label="Home" icon={<WindowIcon />} />
					<BottomNavigationAction label="Recherche" icon={<SearchIcon />} />
					<BottomNavigationAction label="Catalogue" icon={<MenuBookIcon />} />
				</BottomNavigation>
			</div>
		</div>
	);
};

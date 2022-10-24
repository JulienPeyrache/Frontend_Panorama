import ApartmentIcon from "@mui/icons-material/Apartment";
import {
	AppBar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Building } from "../interfaces/entities";
import { baseURL } from "./Const";
import logo from "../assets/logo_macif.png";

export const HeaderBar = (): ReactElement => {
	const [buildings, setBuildings] = useState<Building[]>([]);
	const [chosenBuilding, setChosenBuilding] = useState<Building | null>(null);
	const [buildingName, setBuildingName] = useState<string>(
		"<= Choisir un bâtiment"
	);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenListBuildings = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseListBuildings = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		axios
			.get(baseURL + "/api/building/sortedByName")
			.then((res) => setBuildings(res.data));
	}, []);

	useEffect(() => {
		if (chosenBuilding !== null) {
			localStorage.setItem("building", JSON.stringify(chosenBuilding));
			setBuildingName(chosenBuilding.name_building);
			window.dispatchEvent(new Event("storage"));
		}
	}, [chosenBuilding]);

	return (
		<AppBar
			position="sticky"
			sx={{ display: "flex", flexDirection: "row", backgroundColor: "#26367a" }}
		>
			<IconButton
				onClick={handleOpenListBuildings}
				sx={{
					display: "flex",
					justifyContent: "left",
					marginLeft: 1,
					color: "white",
				}}
			>
				<ApartmentIcon />
			</IconButton>
			<Menu
				sx={{ mt: "45px" }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseListBuildings}
			>
				{buildings.map((building) => (
					<MenuItem
						key={building.name_building}
						onClick={() => {
							setChosenBuilding(building);
							handleCloseListBuildings();
						}}
					>
						<Typography>{building.name_building}</Typography>
					</MenuItem>
				))}
			</Menu>
			<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
				<Toolbar
					variant="dense"
					sx={{ display: "flex", flexDirection: "column" }}
				>
					<Typography variant="h6" color="inherit">
						<b>Panorama</b>
					</Typography>
					<Typography variant="body2" color="inherit">
						{buildingName}
					</Typography>
				</Toolbar>
			</Box>
			<span style={{ marginRight: 1, width: "51px" }}>
				<img
					src={logo}
					alt="Logo MACIF"
					style={{ width: "auto", height: "48px", marginTop: "4px" }}
				/>
			</span>
		</AppBar>
	);
};

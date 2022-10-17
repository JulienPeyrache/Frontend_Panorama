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

export const HeaderBar = (): ReactElement => {
	const [buildings, setBuildings] = useState<Building[]>([]);
	const [chosenBuilding, setChosenBuilding] = useState<Building | null>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenListBuildings = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseListBuildings = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		axios.get(baseURL + "/api/building").then((res) => setBuildings(res.data));
	}, []);

	useEffect(() => {
		if (chosenBuilding !== null) {
			localStorage.setItem("building", JSON.stringify(chosenBuilding));
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
						onClick={handleCloseListBuildings}
					>
						<Typography textAlign="center">{building.name_building}</Typography>
					</MenuItem>
				))}
			</Menu>
			<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
				<Toolbar variant="dense">
					<Typography variant="h6" color="inherit">
						<b>Panorama</b>
					</Typography>
				</Toolbar>
			</Box>
			<span style={{ marginRight: 1, width: "51px" }}></span>
		</AppBar>
	);
};

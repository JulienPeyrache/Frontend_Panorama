import { Grid } from "@mui/material";
import { Divider, Typography } from "@mui/material";
import "./ItemPage.css";
import SimpleItem from "../components/SimpleItem";
import ButtonItem from "../components/ButtonItem";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";
import { useEffect, useState } from "react";
import { Building, ItemMacif, Redirection } from "../interfaces/entities";
import { baseURL } from "../components/Const";
import axios from "axios";

interface ItemPageProps {
	setValueItemPage: (value: number) => void;
	step: string;
}

export const ItemPage = ({
	setValueItemPage,
	step,
}: ItemPageProps): React.ReactElement => {
	const [items, setItems] = useState<any[]>([]);
	const [redirections, setRedirections] = useState<Redirection[]>([]);

	const building = JSON.parse(
		localStorage.getItem("building") || "{}"
	) as Building;

	useEffect(() => {
		axios
			.get(
				baseURL + "/api/item/findByStep/" + step + "/inBuilding/" + building.id
			)
			.then((response) => setItems(response.data));

		axios
			.get(baseURL + "/api/redirection/findByStep/" + step)
			.then((response) => setRedirections(response.data));
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<div>
					<BackButton onClick={() => setValueItemPage(0)} />
					<Typography variant="h3" align="center" sx={{ m: 1 }}>
						<b>{step}</b>
					</Typography>
				</div>
				<Divider orientation="horizontal" />
				<Grid
					container
					padding={2}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					{redirections.length > 0 &&
						redirections.map((redirection) => (
							<ButtonItem
								key={redirection.id}
								label={redirection.label}
								handleClick={() => window.open(redirection.url)}
							/>
						))}
					{items.length > 0 &&
						items.map((item) => (
							<SimpleItem
								key={item.id}
								label={
									item.label_userfriendly
										? item.label_userfriendly
										: item.label_item
								}
								description={item.description}
							/>
						))}
				</Grid>
			</div>
		</ThemeProvider>
	);
};

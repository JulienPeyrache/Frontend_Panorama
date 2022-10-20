import { Grid } from "@mui/material";
import { Divider, Typography } from "@mui/material";
import "./ItemPage.css";
import SimpleItem from "../components/SimpleItem";
import ButtonItem from "../components/ButtonItem";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";

interface ItemPageProps {
	setValueItemPage: (value: number) => void;
	title: string;
}

export const ItemPage = ({
	setValueItemPage,
	title,
}: ItemPageProps): React.ReactElement => {
	return (
		<ThemeProvider theme={theme}>
			<div>
				<div>
					<BackButton onClick={() => setValueItemPage(0)} />
					<Typography variant="h3" align="center" sx={{ m: 1 }}>
						<b>{title}</b>
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
					<SimpleItem label="Salle de repos" description="3e étage" />
					<SimpleItem label="Salle de repos" description="3e étage" />
					<SimpleItem label="Salle de repos" description="3e étage" />
					<SimpleItem label="Salle de repos" description="3e étage" />
				</Grid>
			</div>
		</ThemeProvider>
	);
};

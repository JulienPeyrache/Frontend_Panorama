import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

export interface ActionCardProps {
	name_card: string;
	image_card?: string;
	description_card: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function ActionAreaCard(props: ActionCardProps): React.ReactElement {
	return (
		<Grid
			item
			key={props.name_card}
			m={0.5}
			xs={5.3}
			sm={5.3}
			md={5.3}
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Card sx={{ width: "250px", height: "250px" }}>
				<CardActionArea sx={{ width: "100%" }} onClick={props.handleClick}>
					<CardMedia component="img" height="100" image={props.image_card} />
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography
							gutterBottom
							variant="h6"
							component="div"
							align="center"
						>
							{props.name_card}
						</Typography>
						<Typography variant="body2" color="text.secondary" align="center">
							{props.description_card}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}

export {};

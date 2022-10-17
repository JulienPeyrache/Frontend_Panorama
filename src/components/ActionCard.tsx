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
	handleCLick: React.MouseEventHandler<HTMLButtonElement>;
}

export function ActionAreaCard(props: ActionCardProps): React.ReactElement {
	return (
		<Grid key={props.name_card} m={1} xs={4} sm={4} md={4}>
			<Card sx={{ maxWidth: "auto" }}>
				<CardActionArea onClick={props.handleCLick}>
					<CardMedia component="img" height="100" image={props.image_card} />
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{props.name_card}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{props.description_card}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}

export {};

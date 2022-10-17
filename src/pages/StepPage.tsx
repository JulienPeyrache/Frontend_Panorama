import { Grid, Typography } from "@mui/material";
import { ReactElement } from "react";

interface StepCardProps {
	title: string;
}

export const StepCard = ({ title }: StepCardProps): ReactElement => {
	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			sx={{
				borderRadius: 2,
				border: 2,
				p: 2,
				m: 1,
				backgroundColor: "#90caf9",
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				flexDirection: "row",
			}}
		>
			{title}
		</Grid>
	);
};

export default function StepPage(): ReactElement {
	return (
		<>
			<Grid
				container
				padding={2}
				sx={{ display: "flex", justifyContent: "center" }}
			>
				<Typography variant="h3">
					<StepCard title="Hello" />
					<StepCard title="Ca va ?" />
					<StepCard title="Moi oui" />
				</Typography>
				<StepCard title="et toi ?" />
				<StepCard title="ah super !" />
				<StepCard title="Ca va ?" />
			</Grid>
		</>
	);
}

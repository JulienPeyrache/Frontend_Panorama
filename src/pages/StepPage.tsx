import { Grid, ThemeProvider, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";
import { StepCard } from "../components/StepCard";
import { ItemPage } from "./ItemPage";
import { steps } from "../assets/Const";

interface StepPageProps {
	valueStepPage: number;
	setValueStepPage: (value: number) => void;
	title: string;
}

export default function StepPage({
	valueStepPage,
	setValueStepPage,
	title,
}: StepPageProps): ReactElement {
	const [valueItemPage, setValueItemPage] = useState(0);
	return (
		<>
			{valueItemPage === 0 && (
				<ThemeProvider theme={theme}>
					<div>
						<BackButton onClick={() => setValueStepPage(0)} />
						<Typography variant="h3" align="center" sx={{ m: 1 }}>
							<b>{title}</b>
						</Typography>
					</div>
					<Grid
						container
						padding={2}
						sx={{ display: "flex", justifyContent: "center" }}
					>
						{steps[valueStepPage].map((step: string, i: number) => (
							<StepCard
								key={i}
								title={step}
								handleClick={() => setValueItemPage(i + 1)}
							/>
						))}
					</Grid>
				</ThemeProvider>
			)}
			{steps[valueStepPage].map(
				(step: string, i: number) =>
					valueItemPage === i + 1 && (
						<ItemPage key={i} setValueItemPage={setValueItemPage} step={step} />
					)
			)}
			<span style={{ marginTop: "15%", width: "100%" }}></span>
		</>
	);
}

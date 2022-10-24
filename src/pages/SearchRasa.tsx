import { useEffect, useState } from "react";
import { Step } from "../interfaces/entities";
import { baseURL, rasaURL } from "../components/Const";
import TextField from "@mui/material/TextField";
import "./SearchRasa.css";
import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import { ReactElement } from "react";
import { theme } from "../assets/Theme";
import { BackButton } from "../components/BackButton";
import { StepCard } from "../components/StepCard";
import { ItemPageBis } from "./ItemPage";
import axios from "axios";

interface StepPageProps {
	valueStepPage: number;
	setValueStepPage: (value: number) => void;
	title: string;
}

export const SearchRasa = () => {
	const [textField, setTextField] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [result, setResult] = useState<string[]>([]);
	const [valuePage, setValuePage] = useState<null | string>(null);

	// // text is on the form {"text":"heil",
	// "intent":{"name":"greet","confidence":0.9999971389770508},
	// "entities":[],
	// "text_tokens":[[0,4]],
	// "intent_ranking":[{"name":"greet","confidence":0.9999971389770508},{"name":"affirm","confidence":8.435181939603353e-7},{"name":"bot_challenge","confidence":8.31984834803734e-7},{"name":"mood_great","confidence":5.283874884298712e-7},{"name":"deny","confidence":3.8106446709207376e-7},{"name":"goodbye","confidence":1.7378617656049755e-7},{"name":"mood_unhappy","confidence":1.4201542342107132e-7}],
	// "response_selector":{"all_retrieval_intents":[],"default":{"response":{"responses":null,"confidence":0.0,"intent_response_key":null,"utter_action":"utter_None"},"ranking":[]}}}%

	useEffect(() => {
		// we need to fetch the data from the server
		// wit the the request : rasaURL + '/models/data' + text
		// we obtain a JSON object
		// we need to convert it to a Step[]
		// we need to set the result with the new value
		axios.get(baseURL + "/api/rasa/" + text).then((response) => {
			setResult(response.data);
		});
		console.log(result);
	}, [text]);

	return (
		<div className="search-rasa">
			<h1>Recherche</h1>
			<TextField
				value={textField}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setTextField(event.target.value);
				}}
				sx={{ width: "80%", backgroundColor: "white", m: 1 }}
			></TextField>
			<Button variant="contained" onClick={() => setText(textField)}>
				{" "}
				Rechercher{" "}
			</Button>
			{result.length > 0 && valuePage === null && (
				<div className="result">
					<ThemeProvider theme={theme}>
						<div>
							<Typography variant="h3" align="center" sx={{ m: 1 }}>
								<b>Résultats</b>
							</Typography>
						</div>
						<Grid
							container
							padding={2}
							sx={{ display: "flex", justifyContent: "center" }}
						>
							{result.map((step: string) => (
								<StepCard title={step} handleClick={() => setValuePage(step)} />
							))}
						</Grid>
					</ThemeProvider>
				</div>
			)}
			{result.length > 0 && valuePage !== null && (
				<div>
					<BackButton onClick={() => setValuePage(null)} />
					<Typography variant="h3" align="center" sx={{ m: 1 }}>
						<b>{valuePage as string}</b>
					</Typography>
					<ItemPageBis title={valuePage} />
					<span style={{ marginTop: "15%", width: "100%" }}></span>
				</div>
			)}
		</div>
	);
};

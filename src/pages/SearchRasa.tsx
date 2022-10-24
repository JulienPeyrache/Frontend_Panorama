import { useEffect, useState } from "react";
import { Step } from "../interfaces/entities";
import { rasaURL } from "../components/Const";
import TextField from "@mui/material/TextField";
import "./SearchRasa.css";

export interface Requete {
	text: string;
}

export const SearchRasa = () => {
	const initRequete: Requete = {
		text: "",
	};
	const [text, setText] = useState<Requete>(initRequete);
	const [result, setResult] = useState<Step[]>([]);

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
		console.log(text);
		console.log(text.text);
		console.log('{"text":"' + text.text + '"}');

		fetch("http://localhost:5005/model/parse", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: '{"text":"' + text.text + '"}',
		})
			.then((response) => response.json())
			.then((response) => console.log(response, response.intent_ranking));

		console.log("Ok fetch effectué");
	}, [text]);

	return (
		<div className="search-rasa">
			<TextField
				value={text.text}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					const newText: Requete = {
						text: event.target.value,
					};
					setText(newText);
				}}
				sx={{
					width: "max-content",
					backgroundColor: "white",
				}}
			></TextField>
		</div>
	);
};

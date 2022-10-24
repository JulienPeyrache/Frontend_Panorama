import { useEffect, useState } from "react";
import { Step } from "../interfaces/entities";
import { rasaURL } from "../components/Const";
import TextField from "@mui/material/TextField";

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
		fetch(rasaURL + "/models/parse" + text)
			.then((response) => response.json())
			.then((data) => console.log(data));
		console.log("Ok");
		console.log({ result });
	}, [text]);
	console.log("Ok");

	return (
		<TextField
			value={text.text}
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
				const newText: Requete = {
					text: event.target.value,
				};
				setText(newText);
			}}
			sx={{
				m: 1,
				width: "10ch",
				backgroundColor: "white",
			}}
		></TextField>
	);
};

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
} from "@mui/material/Autocomplete";

interface FilterBarProps {
	label: string;
	liste: string[];
	value?: string | null;
	onChange?: (
		event: React.SyntheticEvent<Element, Event>,
		value: string | null,
		reason: AutocompleteChangeReason,
		details?: AutocompleteChangeDetails<string> | undefined
	) => void;
}

export default function FilterBar(props: FilterBarProps): React.ReactElement {
	return (
		<div>
			<Autocomplete
				id="filterbar-autocomplete"
				style={{ backgroundColor: "white", margin: "2% 8%" }}
				options={props.liste}
				renderInput={(params) => (
					<TextField {...params} label={props.label} />
				)}
				value={props.value}
				onChange={props.onChange}
			/>
		</div>
	);
}

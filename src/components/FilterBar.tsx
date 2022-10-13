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
	width?: number;
}

export default function FilterBar({
	label,
	liste,
	value,
	onChange,
	width,
}: FilterBarProps): React.ReactElement {
	return (
		<div>
			<Autocomplete
				id="filterbar-autocomplete"
				sx={{
					backgroundColor: "white",
					m: 1,
					width: { width },
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				options={liste}
				renderInput={(params) => <TextField {...params} label={label} />}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

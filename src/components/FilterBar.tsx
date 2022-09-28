import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface FilterBarProps {
  label: string;
  liste: string[];
}



export default function FilterBar(props: FilterBarProps): React.ReactElement {
  return (<div>
    <Autocomplete
      id="filterbar-autocomplete"
      style={{ backgroundColor: "white", margin: "2% 8%" }}
      options={props.liste}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  </div>
  );
}
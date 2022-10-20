import { IconButton } from "@mui/material";
import { ReactElement } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface BackButtonProps {
	onClick?: () => void;
}

export const BackButton = ({
	onClick = () => console.log("clicked"),
}: BackButtonProps): ReactElement => {
	return (
		<IconButton
			sx={{
				display: "flex",
				justifyContent: "left",
				color: "#26367a",
				mt: 1,
				paddingBottom: 0,
				"&:hover": {
					backgroundColor: "transparent",
				},
			}}
			onClick={onClick}
		>
			<KeyboardBackspaceIcon
				fontSize="large"
				sx={{
					backgroundColor: "#f5f5f5",
					borderRadius: 2,
					transition: "0.2s",
					"&:hover": {
						cursor: "pointer",
						backgroundColor: "lightgray",
						color: "#1E2B62",
					},
				}}
			/>
		</IconButton>
	);
};

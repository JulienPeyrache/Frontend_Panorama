import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../assets/Theme";

interface ButtonItemProps {
  label: string;
  buttonText: string;
  handleClick?: () => void;
}

export default function ButtonItem({
  label,
  buttonText,
  handleClick,
}: ButtonItemProps) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        borderRadius: 2,
        p: 2,
        m: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        color: "#505050",
        transition: "0.3s",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <ThemeProvider theme={theme}>
        <div style={{ textAlign: "center", padding: 5 }}>
          <b>{label}</b> :
        </div>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#26367a", flexShrink: 0 }}
        >
          {buttonText}
        </Button>
      </ThemeProvider>
    </Grid>
  );
}

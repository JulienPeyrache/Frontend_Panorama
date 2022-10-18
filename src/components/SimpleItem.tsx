import * as React from "react";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../assets/Theme";

interface SimpleItemProps {
  label: string;
  description: string;
}

export default function SimpleItem({ label, description }: SimpleItemProps) {
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
        flexDirection: "column",
        color: "#505050",
        transition: "0.3s",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <ThemeProvider theme={theme}>
        <div style={{ textAlign: "center" }}>
          <b>{label}</b> :
        </div>
        <div style={{ textAlign: "center" }}>{description}</div>
      </ThemeProvider>
    </Grid>
  );
}

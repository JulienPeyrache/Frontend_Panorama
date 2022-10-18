import * as React from "react";
import { Stack } from "@mui/system";
import { Paper, Grid } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
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
        flexDirection: "row",
        color: "#505050",
        transition: "0.3s",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "lightgray",
          color: "#202020",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <div>
          <b>{label}</b> :
        </div>
        <div>{description}</div>
      </ThemeProvider>
    </Grid>
  );
}

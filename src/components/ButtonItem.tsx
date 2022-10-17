import * as React from "react";
import { Stack } from "@mui/system";
import { Paper, Button } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function ButtonItem() {
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <Item elevation={1}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={1}
            sx={{ my: 1, mx: 1 }}
          >
            <div>Item Name:</div>
            <Button variant="contained">Button</Button>
          </Stack>
        </Item>
      </ThemeProvider>
    </div>
  );
}

import * as React from "react";
import { Button, Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";

export default function ButtonItem() {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={1}
    >
      <div>Item Name:</div>
      <Button variant="contained">button</Button>
    </Stack>
  );
}

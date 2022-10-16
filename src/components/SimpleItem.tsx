import * as React from "react";
import { Button, Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";

export default function SimpleItem() {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={1}
    >
      <div>Item Name:</div>
      <div>Item Description</div>
    </Stack>
  );
}

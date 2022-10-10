import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CourseView from "../components/CourseView";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#cfda49",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#26367a",
    },
  },
});

interface CourseData {
  id: number;
  code_course: string;
  label_course: string;
  description_course: string;
}

interface CourseButtonProps {
  course: CourseData;
  id_building: number;
}

export default function CourseButton(
  props: CourseButtonProps
): React.ReactElement {
  const [isShown, setIsShown] = useState<boolean>(true);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setIsShown(true);
          }}
        >
          {props.course.label_course}
        </Button>
        {isShown && (
          <Box
            sx={{
              borderRadius: "16px",
              borderColor: "secondary.main",
              border: 3,
            }}
          >
            <CourseView
              id_building={props.id_building}
              course_data={props.course}
            />
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

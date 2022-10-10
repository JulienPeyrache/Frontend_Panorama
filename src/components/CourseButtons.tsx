import React, { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

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

export interface CourseData {
  id: number;
  code_course: string;
  label_course: string;
  description_course: string;
}

interface CourseButtonsProps {
  id_building: number;
}

export default function CourseButtons(
  props: CourseButtonsProps
): React.ReactElement {
  const [data, setData] = useState<CourseData[]>([]);
  const getData = () => {
    axios
      .get<CourseData[]>(baseURL + "/api/course")
      .then((data) => setData(data.data));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          alignItems: "center",
          columnGap: "10px",
          rowGap: "10px",
          flexWrap: "wrap",
        }}
      >
        {data.map((course) => {
          return (
            <div>
              <Button variant="contained" color="secondary">
                {course.label_course}
              </Button>
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
}

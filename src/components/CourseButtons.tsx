import React, { useState, useEffect } from "react";
import { baseURL } from "../components/Const";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CourseView from "../components/CourseView";
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
      {data.map((course) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              flexWrap: "nowrap",
              rowGap: "20px",
              columnGap: "20px",
            }}
          >
            <Button variant="contained" color="secondary">
              {course.label_course}
            </Button>
            <CourseView id_building={props.id_building} course_data={course} />
          </div>
        );
      })}
    </ThemeProvider>
  );
}

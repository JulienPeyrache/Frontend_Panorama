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

interface CourseData {
  id: number;
  code_course: string;
  label_course: string;
  description_course: string;
}

export default function CourseButtons(): React.ReactElement {
  const [data, setData] = useState<CourseData[]>();
  const getData = async () => {
    const { data } = await axios.get<CourseData[]>(baseURL + "/api/course");
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {data?.map((course) => {
        return (
          <Button variant="contained" color="secondary">
            {course.label_course}
          </Button>
        );
      })}
    </ThemeProvider>
  );
}

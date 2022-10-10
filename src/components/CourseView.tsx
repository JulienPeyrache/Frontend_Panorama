import { SettingsSystemDaydream } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CourseData } from "./CourseList";
import { baseURL } from "./Const";

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

interface CourseProps {
  id_building: number;
  course_data: CourseData;
}

export default function CourseView(props: CourseProps): React.ReactElement {
  const [dataService, setDataService] = useState<any[]>([]);
  const [dataAttachedService, setDataAttachedService] = useState<any[]>([]);
  const [dataItem, setDataItem] = useState<any[]>([]);
  const [dataSite, setDataSite] = useState<any[]>([]);
  const [dataValueItemSite, setDataValueItemSite] = useState<any[]>([]);

  console.log(props.id_building);
  useEffect(() => {
    console.log("useeffect 1");
    axios
      .get(baseURL + "/api/service/findByCourseId/" + props.course_data.id)
      .then((res) => setDataService(dataService.concat(res.data)));
    axios
      .get(baseURL + "/api/site/findByBuildingId/" + props.id_building)
      .then((res) => setDataSite(dataSite.concat(res.data)));
  }, []);

  useEffect(() => {
    console.log("useeffect 2");
    dataService.map((service) => {
      axios
        .get(baseURL + "/api/attached-service/findByServiceId/" + service.id)
        .then((res) =>
          setDataAttachedService(dataAttachedService.concat(res.data))
        );
    });
  }, [dataService]);

  useEffect(() => {
    console.log("useeffect3");
    dataAttachedService.map((attached_service) => {
      axios
        .get(
          baseURL + "/api/item/findByAttachedServiceId/" + attached_service.id
        )
        .then((res) => setDataItem(dataItem.concat(res.data)));
    });
  }, [dataAttachedService]);

  useEffect(() => {
    console.log("useeffect 4");
    dataItem.map((item) => {
      axios
        .get(baseURL + "/api/value-item-site/findByItemId/" + item.id)
        .then((res) =>
          setDataValueItemSite(dataValueItemSite.concat(res.data))
        );
    });
  }, [dataItem]);

  let items: any[] = [];
  let site_ids: number[] = [];

  dataSite.forEach((site) => {
    site_ids.push(site.id);
  });

  dataValueItemSite.forEach((item) => {
    if (site_ids.includes(item.siteId)) {
      items = items.concat(item);
    }
    console.log("item list", items);
  });

  return (
    <div>
      {items.map((item) => {
        console.log(item.description);
        return <div> {item.description} </div>;
      })}
    </div>
  );
}

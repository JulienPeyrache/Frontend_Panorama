import { Box, Button } from "@mui/material";
import ServiceItem from "../components/ServiceItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BuildingList from "../pages/BuildingList";
import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CourseButtons from "../components/CourseButtons";
import { CourseData } from "../components/CourseButtons";
import { baseURL } from "./Const";

interface ServiceData {
  code_service: string;
  courseId: number;
  id: number;
  label_service: string;
}

interface AttachedServiceData {
  id: number;
  label_attached_service: string;
  serviceId: number;
}

interface ItemData {
  id: number;
  label_item: string;
  default_value: string;
  is_occupant_info: boolean;
  attachedServiceId: number;
}

interface SiteData {
  id: number;
  typology_site: string;
  immo: string;
  ET_organisation: string;
  is_courrier: boolean;
  comments: string;
  buildingId: number;
}

interface ValueItemSiteData {
  id: number;
  description: string;
  siteId: number;
  itemId: number;
}

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
  const [dataService, setDataService] = useState<ServiceData[]>([]);
  const [dataAttachedService, setDataAttachedService] = useState<
    AttachedServiceData[]
  >([]);
  const [dataItem, setDataItem] = useState<ItemData[]>([]);
  const [dataSite, setDataSite] = useState<SiteData[]>([]);
  const [dataValueItemSite, setDataValueItemSite] = useState<
    ValueItemSiteData[]
  >([]);

  const getServiceData = () => {
    axios
      .get<ServiceData[]>(
        baseURL + "/api/service/findByCourseId/" + props.course_data.id
      )
      .then((data) => {
        setDataService(data.data);
      });
  };
  const getAttachedServiceData = (serviceId: number) => {
    axios
      .get<AttachedServiceData[]>(
        baseURL + "/api/attached-service/findByServiceId/" + serviceId
      )
      .then((data) => setDataAttachedService(data.data));
  };
  const getItemData = (attachedServiceId: number) => {
    axios
      .get<ItemData[]>(
        baseURL + "/api/item/findByAttachedServiceId/" + attachedServiceId
      )
      .then((data) => setDataItem(data.data));
  };
  const getSiteData = (buildingId: number) => {
    axios
      .get<SiteData[]>(baseURL + "/api/site/findByBuildingId/" + buildingId)
      .then((data) => setDataSite(data.data));
  };
  const getValueItemSiteData = (itemId: number) => {
    axios
      .get<ValueItemSiteData[]>(
        baseURL + "/api/value-item-site/findByItemId/" + itemId
      )
      .then((data) => setDataValueItemSite(data.data));
  };

  useEffect(() => {
    getSiteData(props.id_building);
    getServiceData();
    dataService.map((service) => {
      getAttachedServiceData(service.id);
    });
    dataAttachedService.map((attached_service) => {
      getItemData(attached_service.id);
    });
    dataItem.map((item) => {
      getValueItemSiteData(item.id);
    });
  }, []);

  const items: ValueItemSiteData[] = [];
  const site_ids: number[] = [];

  dataSite.forEach((site) => {
    site_ids.push(site.id);
  });

  dataValueItemSite.forEach((item) => {
    if (!site_ids.includes(item.siteId)) {
      items.push(item);
    }
  });

  return (
    <div>
      {items.map((item) => {
        return <p> {item.description} </p>;
      })}
    </div>
  );
}

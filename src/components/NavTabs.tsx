import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { ManagerService } from "../pages/ManagerService";
import { ManagerEquipment } from "../pages/ManagerEquipment";
import { ManagerAdmin } from "../pages/ManagerAdmin";
import { TabAttachedService } from "../tabs/TabAttachedService";
import { TabBuilding } from "../tabs/TabBuilding";
import { TabSite } from "../tabs/TabSite";
import { TabItem } from "../tabs/TabItem";
import { TabEquipment } from "../tabs/TabEquipment";
import { TabCourse } from "../tabs/TabCourse";
import { TabService } from "../tabs/TabService";

//     TabAttachedService,
//     TabBuilding,
//     TabSite,
//     TabItem,
//     TabService,
//     TabEquipment,
//     TabCourse,
// } from "../tabs";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface LinkTabProps {
    label?: string;
    href?: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export function NavTabsManager() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ color: "white", width: "100%" }}>
            <Box
                sx={{ color: "white", borderBottom: 1, borderColor: "divider" }}
            >
                <Tabs
                    value={value}
                    textColor="secondary"
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="Test"
                >
                    <LinkTab
                        label="Service"
                        href="/manager-service"
                        {...a11yProps(0)}
                    />
                    <LinkTab
                        label="Équipement"
                        href="/manager-equipment"
                        {...a11yProps(1)}
                    />
                    <LinkTab
                        label="Gestion Admin"
                        href="/manager-admin"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ManagerService />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ManagerEquipment />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ManagerAdmin />
            </TabPanel>
        </Box>
    );
}

export function NavTabsTables() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ color: "white", width: "100%" }}>
            <Box
                sx={{ color: "white", borderBottom: 1, borderColor: "divider" }}
            >
                <Tabs
                    value={value}
                    textColor="secondary"
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="Test"
                >
                    <LinkTab
                        label="Service"
                        href="/à-compléter"
                        {...a11yProps(0)}
                    />
                    <LinkTab
                        label="Équipement"
                        href="/à-compléter"
                        {...a11yProps(1)}
                    />
                    <LinkTab
                        label="Parcours"
                        href="/à-compléter"
                        {...a11yProps(2)}
                    />
                    <LinkTab
                        label="Service rattaché"
                        href="/à-compléter"
                        {...a11yProps(3)}
                    />
                    <LinkTab
                        label="Bâtiment"
                        href="/à-compléter"
                        {...a11yProps(4)}
                    />
                    <LinkTab
                        label="Site"
                        href="/à-compléter"
                        {...a11yProps(5)}
                    />
                    <LinkTab
                        label="Item"
                        href="/à-compléter"
                        {...a11yProps(6)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabService />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabEquipment />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabCourse />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TabAttachedService />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TabBuilding />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <TabSite />
            </TabPanel>
            <TabPanel value={value} index={6}>
                <TabItem />
            </TabPanel>
        </Box>
    );
}

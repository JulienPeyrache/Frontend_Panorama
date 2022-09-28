import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { AdminService } from '../pages/AdminService';

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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface LinkTabProps {
    label?: string;
    href?: string;
    textColor?: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function NavTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ color: 'white', width: '100%' }}>
            <Box sx={{ color: 'white', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    textColor='secondary'
                    indicatorColor='secondary'
                    onChange={handleChange}
                    aria-label="Test"
                >
                    <LinkTab label="Service" textColor='white' href="/admin-service" {...a11yProps(0)} />
                    <LinkTab label="Équipement" textColor='white' href="/admin-equipment" {...a11yProps(1)} />
                    <LinkTab label="Ajouter un service" textColor='white' href="/spam" {...a11yProps(2)} />
                    <LinkTab label="Gestion Admin" textColor='white' href='./spam' {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AdminService />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item One
            </TabPanel>
        </Box>
    );
}
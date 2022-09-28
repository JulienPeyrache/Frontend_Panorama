import { useState, SyntheticEvent, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface LinkTabProps {
    label?: string;
    href?: string;
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
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="Test">
                <LinkTab label="Service" href="/drafts" />
                <LinkTab label="Équipement" href="/trash" />
                <LinkTab label="Ajouter un service" href="/spam" />
                <LinkTab label="Gestion Admin" href='/spam' />
            </Tabs>
        </Box>
    );
}
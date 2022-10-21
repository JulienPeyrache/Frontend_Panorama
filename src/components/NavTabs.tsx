import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

interface AuxTabs {
	label: string;
	numero: number;
	link: string;
	component: React.ReactElement;
}
interface AuxTabsGroup {
	tabs: AuxTabs[];
}
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

interface LinkTabProps {
	label?: string;
	href?: string;
	id?: string;
	"aria-controls"?: string;
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

export function NavTabs(tabList: AuxTabsGroup) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ color: "white", width: "100%" }}>
			<Box
				sx={{
					color: "white",
					borderBottom: 1,
					borderColor: "divider",
				}}
			>
				<Tabs
					value={value}
					textColor="secondary"
					indicatorColor="secondary"
					onChange={handleChange}
					aria-label="tab"
				>
					{tabList.tabs.map((onglet: AuxTabs) => {
						return (
							<LinkTab
								key={"tab" + onglet.numero}
								label={onglet.label}
								href={onglet.link}
								id={"simple-tab-${onglet.numero}"}
								aria-controls={"simple-tabpanel-${onglet.numero}"}
							/>
						);
					})}
				</Tabs>
			</Box>
			{tabList.tabs.map((onglet: AuxTabs) => {
				return (
					<TabPanel
						key={"panel" + onglet.numero}
						value={value}
						index={onglet.numero}
					>
						{onglet.component}
					</TabPanel>
				);
			})}
		</Box>
	);
}

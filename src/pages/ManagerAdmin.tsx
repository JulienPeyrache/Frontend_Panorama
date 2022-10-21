import "./ManagerAdmin.css";
import { NavTabs } from "../components/NavTabs";
import { TabAttachedService } from "../tabs/TabAttachedService";
import { TabService } from "../tabs/TabService";
import { TabEquipment } from "../tabs/TabEquipment";
import { TabCourse } from "../tabs/TabCourse";
import { TabBuilding } from "../tabs/TabBuilding";
import { TabItem } from "../tabs/TabItem";
import { TabRedirection } from "../tabs/TabRedirection";
import { ReactElement } from "react";

interface AuxTabs {
	label: string;
	numero: number;
	link: string;
	component: ReactElement;
}

const tabList: AuxTabs[] = [
	{
		label: "Parcours",
		link: "/course",
		numero: 0,
		component: <TabCourse />,
	},

	{
		label: "Service",
		link: "/service",
		numero: 1,
		component: <TabService />,
	},

	{
		label: "Service rattaché",
		link: "/attached-service",
		numero: 2,
		component: <TabAttachedService />,
	},

	{ label: "Item", link: "/item", numero: 3, component: <TabItem /> },

	{
		label: "Équipement",
		link: "/equipment",
		numero: 4,
		component: <TabEquipment />,
	},

	{
		label: "Bâtiment",
		link: "/building",
		numero: 5,
		component: <TabBuilding />,
	},

	{
		label: "Redirection",
		link: "/redirection",
		numero: 6,
		component: <TabRedirection />,
	},
];

interface AuxTabsGroup {
	tabs: AuxTabs[];
}

const tabGroup: AuxTabsGroup = {
	tabs: tabList,
};

export const ManagerAdmin = (): React.ReactElement => {
	return <NavTabs {...tabGroup} />;
};

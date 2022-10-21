import "./ManagerHome.css";
import { NavTabs } from "../components/NavTabs";
import { ManagerAdmin } from "./ManagerAdmin";
import { ManagerEquipment } from "./ManagerEquipment";
import { ManagerService } from "./ManagerService";

interface AuxTabsGroup {
	tabs: AuxTabs[];
}
interface AuxTabs {
	label: string;
	numero: number;
	link: string;
	component: React.ReactElement;
}

const tabList: AuxTabs[] = [
	{
		label: "Service",
		link: "/manager-service",
		numero: 0,
		component: <ManagerService key={0} />,
	},
	{
		label: "Équipement",
		link: "/manager-equipment",
		numero: 1,
		component: <ManagerEquipment key={1} />,
	},
	{
		label: "Gestion Admin",
		link: "/manager-admin",
		numero: 2,
		component: <ManagerAdmin key={2} />,
	},
];

const tabGroup: AuxTabsGroup = {
	tabs: tabList,
};

export const ManagerHome = (): React.ReactElement => {
	return <NavTabs {...tabGroup} />;
};

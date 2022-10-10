import "./ManagerAdmin.css"
import { NavTabs } from "../components/NavTabs"
import { TabAttachedService } from "../tabs/TabAttachedService"
import { TabService } from "../tabs/TabService"
import { TabEquipment } from "../tabs/TabEquipment"
import { TabCourse } from "../tabs/TabCourse"
import { TabBuilding } from "../tabs/TabBuilding"
import { TabItem } from "../tabs/TabItem"
import { TabSite } from "../tabs/TabSite"
import { ReactElement } from "react"

interface AuxTabs {
    label: string
    numero: number
    link: string
    component: ReactElement
}

const tabList: AuxTabs[] = [
    {
        label: "Service",
        link: "/à-compléter",
        numero: 0,
        component: <TabService />,
    },

    {
        label: "Équipement",
        link: "/à-compléter",
        numero: 1,
        component: <TabEquipment />,
    },

    {
        label: "Parcours",
        link: "/à-compléter",
        numero: 2,
        component: <TabCourse />,
    },

    {
        label: "Service rattaché",
        link: "/à-compléter",
        numero: 3,
        component: <TabAttachedService />,
    },

    {
        label: "Bâtiment",
        link: "/à-compléter",
        numero: 4,
        component: <TabBuilding />,
    },

    { label: "Site", link: "/à-compléter", numero: 5, component: <TabSite /> },

    { label: "Item", link: "/à-compléter", numero: 6, component: <TabItem /> },
]

interface AuxTabsGroup {
    tabs: AuxTabs[];
}

const tabGroup: AuxTabsGroup = {
    tabs: tabList,
};

export const ManagerAdmin = (): React.ReactElement => {
    return <NavTabs {...tabGroup} />
}

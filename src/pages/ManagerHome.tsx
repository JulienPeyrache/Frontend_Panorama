import "./ManagerHome.css";
import { NavTabsManager } from "../components/NavTabs";

export const ManagerHome = (): React.ReactElement => {
    return (
        <div className="manager-home">
            <h1>Gestion des services</h1>
            <NavTabsManager />
        </div>
    );
};

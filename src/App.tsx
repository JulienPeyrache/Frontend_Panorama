import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdvancedSearch } from "./pages/AdvancedSearch";
import { ManagerHome } from "./pages/ManagerHome";
import { ManagerService } from "./pages/ManagerService";
import { ManagerEquipment } from "./pages/ManagerEquipment";
import { ManagerAdmin } from "./pages/ManagerAdmin";

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/advanced-search" element={<AdvancedSearch />} />
                <Route path="/manager" element={<ManagerHome />} />
                <Route path="/manager-service" element={<ManagerService />} />
                <Route
                    path="/manager-equipment"
                    element={<ManagerEquipment />}
                />
                <Route path="/manager-admin" element={<ManagerAdmin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

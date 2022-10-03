import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdvancedSearch } from "./pages/AdvancedSearch";
import { MonitorHome } from "./pages/AdminHome";
import { MonitorService } from "./pages/AdminService";
import { MonitorEquipment } from "./pages/AdminEquipment";
import { MonitorAdmin } from "./pages/AdminMonitor";

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/advanced-search" element={<AdvancedSearch />} />
                <Route path="/admin" element={<MonitorHome />} />
                <Route path="/admin-service" element={<MonitorService />} />
                <Route path="/admin-equipment" element={<MonitorEquipment />} />
                <Route path="/admin-monitoring" element={<MonitorAdmin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

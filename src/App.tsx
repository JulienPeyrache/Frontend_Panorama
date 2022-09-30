import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdvancedSearch } from "./pages/AdvancedSearch";
import { AdminHome } from "./pages/AdminHome";
import { AdminService } from "./pages/AdminService";
import { AdminEquipment } from "./pages/AdminEquipment";

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/advanced-search" element={<AdvancedSearch />} />
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin-service" element={<AdminService />} />
                <Route path="/admin-equipment" element={<AdminEquipment />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

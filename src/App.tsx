<<<<<<< HEAD
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
=======
import './App.css';
import { Home } from './pages/Home';
import { Building } from './pages/Building';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path= "/building_test" element={<Building name='Bâtiment Pernet' parcours={['Se déplacer', 'Etre accueili', "Disposer d'un environnement de travail sain et confortable", "Disposer d'équipements et services adaptés pour travailler", "Se réunir et collaborer"]} />} />
        </Routes>
    </BrowserRouter>
  );
>>>>>>> 4222ff4 (initial building page commit)
}

export default App;

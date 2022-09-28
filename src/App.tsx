import './App.css';
import { Home } from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdvancedSearch } from './pages/AdvancedSearch';
import { AdminService } from './pages/AdminService';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/admin-service" element={<AdminService />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

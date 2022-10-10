import { Button } from "@mui/material";
import logo from "../assets/logo_macif.png";
import SearchBar from "../components/SearchBar";
import "./Home.css";

export const Home = (): React.ReactElement => {
  return (
    <div className="home">
      <h1>Panorama</h1>
      <img className="logo" src={logo} alt="Logo MACIF" />
      <h2>Bonjour Julie !</h2>
      <SearchBar />
      <div className="advancedsearch">
        <Button variant="contained" href="advanced-search">
          Recherche avancée
        </Button>
      </div>
    </div>
  );
};

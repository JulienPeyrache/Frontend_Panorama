import FilterBar from "./FilterBar";
export const listCity: string[] = [
    "Paris",
    "Niort",
    "Nantes",
    "Lyon",
    "Quimper",
];

export const listBuilding: string[] = [
    "Pernet",
    "Bouygues",
    "Eiffel",
    "Le Phenix",
];

export const listSite: string[] = ["01", "02", "03", "04", "04"];

export const listService: string[] = ["AST", "DEM", "LOREM IPSUM"];

export const listChamps = [
    { label: "Ville", liste: listCity },
    { label: "Bâtiment", liste: listBuilding },
    { label: "Site", liste: listSite },
    { label: "Service", liste: listService },
];

export const listChampsFilterBar = listChamps.map((elem) => (
    <FilterBar {...elem} />
));

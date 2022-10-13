import FilterBar from "./FilterBar";
import { GridRowsProp } from "@mui/x-data-grid";
import { createTheme } from "@mui/material";

export const baseURL = 'https://api.macif-panorama.mvp.centralesupelec.fr';

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

export const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#cfda49",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
    },
});

export const listSite: string[] = ["01", "02", "03", "04", "04"];

export const listService: string[] = ["AST", "DEM", "LOREM IPSUM"];

export const listChamps = [
    { label: "Ville", liste: listCity },
    { label: "Bâtiment", liste: listBuilding },
    { label: "Site", liste: listSite },
    { label: "Service", liste: listService },
];

export const listChampsFilterBar = listChamps.map((elem) => (
    <FilterBar key={elem.label} {...elem} />
));

export const gridRowsCourse: GridRowsProp = [
    {
        id: 1,
        code_course: "Hello",
        label_course: "World",
        description: "Hello World",
    },
    {
        id: 2,
        code_course: "XGrid",
        label_course: "is Awesome",
        description: "XGrid is Awesome",
    },
    {
        id: 3,
        code_course: "Material-UI",
        label_course: "is Amazing",
        description: "Material-UI is Amazing",
    },
];

export const glossaire: GridRowsProp = [
    {
        code: "AST",
        label: "Accueil Physique",
        description:
            "Accueil qui dispose d'une implantation et d'une infrastructure dédiée (hall d'accueil dans un bâtiment avec une banque d'accueil, un salon d'accueil pour les visiteurs équipé de mobilier). Le service est délivré par des ressources dédiée à cette activité et dont c'est la mission principale.Ce service peut être indifféremment délivré par des ressources internes ou externes.",
    },
    {
        code: "AST",
        label: "Accueil partagé",
        description:
            "Mêmes caractéristiques que l'accueil physique en ce qui concerne l'implantation et l'infrastructure dédiée à  ce service. En ce qui concerne les ressources hôtes et hôtesses ces dernières sont partagées avec d'autres utilisateurs/occupants du bâtiment étudié.",
    },
    {
        code: "AST",
        label: "Pause médiane",
        description:
            "Pause déjeuner absence longue nécessitant un dispositif pour assurer la continuité de service.",
    },
    {
        code: "AST",
        label: "Standard téléphonique",
        description:
            "Traitement des appels entrants qui aboutissent sur la ligne commune du site. Les hôtes et hôtesses assurent la mise en relation vers la personne ou le service demandés. Traitement des appels entrant en non réponse. Par principe ne concerne que les appels sociétaire et clientèle qui sont traités par les CRC.",
    },
    {
        code: "DEM",
        label: "IRP",
        description:
            "IRP = Instance Représentative du Personnel. Tout projet d'aménagement de déménagement doit être soumis au CSSCT. Le CSSCT est une commission spécifique créée au sein du comité social et économique (CSE) qui traite des questions de santé, de sécurité et des conditions de travail.",
    },
];
export const rowsCourse: GridRowsProp = [
    {
        id: 1,
        code_course: "DEP",
        label_course: "Se déplacer",
        description:
            "Proposer des infrastructures et des moyens de mobilité pour arriver sur le lieu de travail, se déplacer et réaliser ses missions professionnelles",
    },
    {
        id: 2,
        "code_course": "ACC",
        "label_course": "Etre accueilli",
        "description":
            "Accueillir et accompagner le parcours complet d’un occupant ou d’un visiteur"
    },
    {
        id: 3,
        "code_course": "ENT",
        "label_course": "Disposer d'un environnement de travail sain et confortable",
        "description":
            "Assurer l'entretien, l'hygiène et le bon fonctionnement des locaux pour le confort et le bien être des occupants"
    },
    {
        id: 4,
        "code_course": "EQS",
        "label_course": "Disposer d'équipements et services adaptés pour travailler",
        "description":
            "Offrir des équipements et des services professionnels pour réaliser ses missions de travail"
    },
    {
        id: 5,
        "code_course": "COL",
        "label_course": "Se réunir et collaborer",
        "description":
            "Mettre à disposition des espaces, ressources et outils digitaux pour favoriser la collaboration professionnelle"
    },
    {
        id: 6,
        "code_course": "ODE",
        "label_course": "Organiser des événements",
        "description":
            "Organiser des événements clé en main et animer les sites"
    },
    {
        id: 7,
        "code_course": "RSD",
        "label_course": "Se restaurer et se détendre",
        "description":
            "Disposer d'une offre de restauration et boissons ainsi que des espaces et services pour se détendre"
    },
    {
        id: 8,
        "code_course": "SEC",
        "label_course": "Assurer la santé, la sûreté et la sécurité",
        "description":
            "Garantir la sécurité, la sûreté et l'accès à des services pour la santé"
    },
    {
        id: 9,
        "code_course": "PER",
        "label_course": "Faciliter la vie personnelle au quotidien",
        "description":
            "Concilier vie personnelle et vie professionnelle"
    },
    {
        id: 10,
        "code_course": "ASS",
        "label_course": "S'informer, assister et accompagner les utilisateurs",
        "description":
            "Assister et orienter l'utilisateur dans son parcours"
    },
];

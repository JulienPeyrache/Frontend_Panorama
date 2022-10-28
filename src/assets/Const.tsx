export const baseURL = "https://api.macif-panorama.mvp.centralesupelec.fr";

export const needs: string[] = [
	"Restauration",
	"Commodités",
	"Outils de travail",
	"Support & sécurité",
];

export const steps: Record<number, string[]> = {
	1: ["Restaurant d'entreprise", "Offre en libre service"],
	2: ["Se détendre", "Services à la personne", "Hygiène"],
	3: [
		"Se déplacer",
		"Organiser une réunion",
		"Organiser un événement",
		"Accueillir des visiteurs",
		"Equipements du bâtiment",
		"Réception et expédition de courrier",
		"Reprographie",
		"Archivage",
		"Déménager et aménager",
	],
	4: [
		"Guichet de support ET",
		"Guichet de support IT",
		"Entretien des extérieurs",
		"Sécurité et sûreté",
	],
};

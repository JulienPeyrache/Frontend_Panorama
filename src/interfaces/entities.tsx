export enum TypologyBuilding {
	MIXTE = "Mixte",
	PAP = "PAP",
	TECHNIQUE = "Technique",
	TERTIAIRE = "Tertiaire",
}

export enum Step {
	RESTAURANT = "Restaurant d'entreprise",
	OPEN_SERVICE = "Offre en libre service",
	RELAX = "Se détendre",
	PERSONAL = "Services à la personne",
	HYGIENE = "Hygiène",
	MOVE = "Se déplacer",
	MEETING = "Organiser une réunion",
	EVENT = "Organiser un événement",
	GUEST = "Accueillir des visiteurs",
	EQUIPMENT = "Equipements du bâtiment",
	MAIL = "Réception et expédition de courrier",
	PRINT = "Reprographie",
	ARCHIVE = "Archivage",
	RELOCATE = "Déménager et aménager",
	ET_SUPPORT = "Guichet de support ET",
	IT_SUPPORT = "Guichet de support IT",
	LANDSCAPING = "Entretien des extérieurs",
	SAFETY = "Sécurité et sûreté",
}

export interface Building {
	id: number;
	name_building: string;
	address: string;
	postal_code: number;
	city: string;
	typology_building: TypologyBuilding;
	is_courrier: boolean;
}

export interface AttachedService {
	label_attached_service: string;
	service: Service;
}
export interface Course {
	code_course: string;
	label_course: string;
	description: string;
}

export interface Service {
	code_service: string;
	label_service: string;
	course: Course;
}

export interface Equipment {
	label_equipment: string;
	step?: Step;
}

export interface ItemMacif {
	id?: number;
	label_item: string;
	label_userfriendly?: string;
	step?: Step;
	is_occupant_info: boolean;
	attachedService: AttachedService;
}

export interface ValueEquipmentBuilding {
	id: number;
	equipmentId: number;
	buildingId: number;
	description: string;
}

export interface ValueItemBuilding {
	id: number;
	itemId: number;
	buildingId: number;
	description: string;
}

export interface Redirection {
	id?: number;
	step: Step;
	label: string;
	url: string;
}

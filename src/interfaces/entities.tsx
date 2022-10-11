export interface Building {
	id: number;
	name_building: string;
	address: string;
	postal_code: number;
	city: string;
	typology_building: TypologyBuilding;
}

export enum TypologyBuilding {
	MIXTE = "Mixte",
	PAP = "PAP",
	TECHNIQUE = "Technique",
	TERTIAIRE = "Tertiaire",
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
}

export interface ItemMacif {
	label_item: string;
	default_value?: string;
	is_occupant_info: boolean;
	attachedService: AttachedService;
}

export enum TypologySite {
	ARCHIVES = "ARCHIVES",
	CRC_PRO = "CRC PRO",
	CRC_COM = "CRC COM",
	CRC_SIN = "CRC SIN",
	CRD_MACIF_DIRECT = "CRD MACIF DIRECT",
	ESPACE_RESTAURATION = "Espace Restauration",
	IRD = "IRD",
	PAP = "PAP",
	RE = "RE",
	SGD = "SGD",
	SUPPORT = "SUPPORT",
	TERTIAIRE = "Tertiaire",
}

export enum Immo {
	AMM = "AMM",
	CNP = "CNP",
	FE = "FE",
	NORD_EST = "Nord Est",
	OUEST = "Ouest",
	SUD_EST = "Sud Est",
}

export enum ETOrganisation {
	AMM = "AMM",
	DIET_CNP = "DIET CNP",
	FE = "FE",
	NORD_EST = "Nord Est",
	OUEST = "Ouest",
	SUD_EST = "Sud Est",
}

export interface Site {
	id: number;
	typology_site: TypologySite;
	immo: Immo;
	ET_organisation: ETOrganisation;
	is_courrier: boolean;
	comments: string;
	building: Building;
}

export interface ValueEquipmentBuilding {
	id: number;
	equipmentId: number;
	buildingId: number;
	description: string;
}

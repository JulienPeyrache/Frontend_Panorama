export interface Site {
	id: number;
	typology_site: string;
	immo: string;
	ET_organisation: string;
	is_courrier: boolean;
	comments: string;
	buildingId: number;
}

export interface Building {
	id: number;
	name_building: string;
	address: string;
	postal_code: number;
	city: string;
	typology_building: string;
}

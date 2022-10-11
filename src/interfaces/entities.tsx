export interface Building {
	id: number;
	name_building: string;
	address: string;
	postal_code: number;
	city: string;
	typology_building: string;
}

export interface ValueEquipmentBuilding {
	id: number;
	equipmentId: number;
	buildingId: number;
	description: string;
}

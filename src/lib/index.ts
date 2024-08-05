import type { GeoJSON } from 'geojson';

export interface PointDataType {
	id: number;
	asset_name: string | null;
	asset_type: string;
	associated_person: string;
	relevance: string;
	jurisdiction: string;
	registered_address: string;
	link: string | null;
	link_text: string | null;
	photo: string | null;
}

export interface AppDataType {
	assets: GeoJSON;
	countries: GeoJSON;
}

export const asset_type_dict: Record<string, string> = {
	apartment: 'Квартира',
	house: 'Будинок',
	company: 'Компанія'
};

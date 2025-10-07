import type { GeoJSON } from 'geojson';

export interface PointDataType {
	id: number;
	asset_name: string | null;
	asset_type: string;
	associated_person: string;
	associated_person_en: string;
	relevance: string;
	relevance_en: string;
	jurisdiction: string;
	registered_address: string;
	link: string | null;
	link_text: string | null;
	link_en: string | null;
	link_text_en: string | null;
	photo: string | null;
}

export interface AppDataType {
	assets: GeoJSON;
	countries: GeoJSON;
}

export type LangType = 'uk' | 'en';

export const asset_type_dict: Record<string, Record<LangType, string>> = {
	apartment: { uk: 'Квартира', en: 'Apartment' },
	house: { uk: 'Будинок', en: 'House' },
	company: { uk: 'Компанія', en: 'Company' },
	patent: { uk: 'Патент', en: 'Patent' },
	land: { uk: 'Ділянка', en: 'Landscape' },
	yacht: { uk: 'Яхта', en: 'Yacht' }
};

import type { GeoJSON } from 'geojson';

interface PointDataType {
	id: number;
	asset_type: string;
	associated_person: string;
	relevance: string;
	jurisdiction: string;
	registered_address: string;
	link: string;
}

interface MapFeature {
	type: 'Feature';
	geometry: {
		type: 'Point' | 'Polygon';
		coordinates: number[] | number[][];
	};
	properties: PointDataType;
}

export interface MapDataType {
	type: 'FeatureCollection';
	features: MapFeature[];
}

export interface AppDataType {
	assets: GeoJSON;
	countries: GeoJSON;
}

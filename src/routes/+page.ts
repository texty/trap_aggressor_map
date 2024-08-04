import type { PageLoad } from './$types';
import type { GeoJSON } from 'geojson';
import type { AppDataType } from '$lib/types';

import { base } from '$app/paths';

async function fetch_geojson(filename: string, fetch: Function): Promise<GeoJSON> {
	const resp = await fetch(`${base}/${filename}.geojson`);
	return (await resp.json()) as GeoJSON;
}

export const load: PageLoad = async ({ fetch }) => {
	const assets = await fetch_geojson('assets', fetch);
	const countries = await fetch_geojson('countries', fetch);
	return { assets, countries } as AppDataType;
};

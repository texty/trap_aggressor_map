import type { PageLoad } from './$types';
import type { AppDataType } from '$lib';

import { base } from '$app/paths';

export const load: PageLoad = async ({ fetch }) => {
	const assets = await (await fetch(`${base}/assets.geojson`)).json();
	const countries = await (await fetch(`${base}/countries.geojson`)).json();
	return { assets, countries } as AppDataType;
};

import csv
import json
from typing import Any

DATA_PATH = 'scripts/data.csv'
COUNTRIES_PATH = 'scripts/countries.geojson'
WRITE_PATH = 'static/{}.geojson'

# country_name_dict = {
#     'U.K. of Great Britain and Northern Ireland': 'United Kingdom',
# }
country_name_dict = {}
country_name_dict_rev = dict(map(reversed, country_name_dict.items()))

def read_csv_features(path = DATA_PATH) -> list[dict[str, Any]]:
    """
    Transform csv with columns "lat" and "lon" into geojson
    """
    geojson = {
        'type': 'FeatureCollection',
        'features': []
    }
    with open(path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Extract latitude and longitude
            lat = float(row.pop('lat'))
            lon = float(row.pop('lon'))

            # Create a GeoJSON feature
            feature = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [lon, lat]
                },
                'properties': row  # Keep the rest of the data as properties
            }
            # Add the feature to the features list
            geojson['features'].append(feature)
    return geojson


def add_countries(geojson: dict[str, Any]) -> dict[str, Any]:
    used_countries = {
        country_name_dict_rev.get(x['properties']['jurisdiction'], x['properties']['jurisdiction'])
        for x in geojson['features']
    }
    with open(COUNTRIES_PATH, 'r', encoding='utf-8') as f:
        countries = json.load(f)
    countries['features'] = list(filter(
        lambda x: x['properties']['GEOUNIT'] in used_countries,
        countries['features'],
    ))
    # for i, f in enumerate(countries['features']):
    #     countries['features'][i]['properties']['name'] = country_name_dict.get(
    #         f['properties']['name'], f['properties']['name'])
    with open(WRITE_PATH.format('countries'), 'w', encoding='utf-8') as f:
        json.dump(countries, f)


def main():
    geojson = read_csv_features(DATA_PATH)
    add_countries(geojson)
    with open(WRITE_PATH.format('assets'), 'w', encoding='utf-8') as f:
        json.dump(geojson, f)


if __name__ == '__main__':
    main()

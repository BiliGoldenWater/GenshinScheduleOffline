import { registerMessage } from "../utils";
import { Position, posToLatLng } from "../utils/mapPositionUtils";

export const MapZoomMin = 2.5;
export const MapZoomMax = 6;
export const MapBounds = [24, 8, 232, 184];

type Markers = {
  name: string;
  location: Position;
}[];

const CountryMarkers: Markers = [
  {
    name: registerMessage({ defaultMessage: "Mondstadt" }),
    location: { x: 2.07, y: -1.25 },
  },
  {
    name: registerMessage({ defaultMessage: "Liyue" }),
    location: { x: -22.29, y: 22.52 },
  },
  {
    name: registerMessage({ defaultMessage: "Inazuma" }),
    location: { x: 35.23, y: 89.82 },
  },
  {
    name: registerMessage({ defaultMessage: "Sumeru" }),
    location: { x: -61.02, y: 41.51 },
  },
];

const RegionMarkers: Markers = [
  {
    name: registerMessage({ defaultMessage: "Starfell Valley" }),
    location: { x: 6.6, y: -10.7 },
  },
];

const PlaceMarkers: Markers = [
  {
    name: registerMessage({ defaultMessage: "Springvale" }),
    location: { x: -1.1, y: -2 },
  },
];

function translation(markers: Markers): unknown {
  return markers
    .map(({ name, location }) => {
      let { lat, lng } = posToLatLng(location);
      return {
        name,
        location: [lat, lng],
      };
    })
    .map(({ name: id, location: coordinates }) => ({
      type: "Feature",
      id,
      geometry: {
        type: "Point",
        coordinates,
      },
    }));
}

export const GeoCountryMarkers = translation(CountryMarkers);
export const GeoRegionMarkers = translation(RegionMarkers);
export const GeoPlaceMarkers = translation(PlaceMarkers);

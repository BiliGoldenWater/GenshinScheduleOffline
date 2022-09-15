import { registerMessage } from "../utils";
import { LatLng } from "leaflet";

export const MapZoomMin = 2.5;
export const MapZoomMax = 6;
export const MapBounds = [24, 8, 232, 184];
export const MapOffset: Position = { x: 134.3, y: 44 };
export const MapScale = 1;

export type Position = { x: number; y: number };

export type ReverseYPosition = { x: number; y: number };

type Markers = {
  name: string;
  location: Position;
}[];

export const CountryMarkers: Markers = [
  {
    name: registerMessage({ defaultMessage: "Mondstadt" }),
    location: { x: 7, y: -8 },
  },
];

export const RegionMarkers: Markers = [
  {
    name: registerMessage({ defaultMessage: "Starfell Valley" }),
    location: { x: 6.6, y: -10.7 },
  },
];

export const PlaceMarkers: Markers = [
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

export function deLatLng({ lat, lng }: LatLng): [number, number] {
  return [lat, lng];
}

function reverseY(pos: Position): ReverseYPosition {
  return {
    ...pos,
    y: pos.y * -1,
  };
}

function scale(pos: Position): Position {
  return scalePosBy(pos, MapScale);
}

export function scalePosBy(pos: Position, scale: number): Position {
  return {
    x: pos.x * scale,
    y: pos.y * scale,
  };
}

export function applyPosOffset(pos: Position): Position {
  return {
    x: pos.x + MapOffset.x,
    y: pos.y + MapOffset.y,
  };
}

function descale(pos: Position): Position {
  return {
    x: pos.x / MapScale,
    y: pos.y / MapScale,
  };
}

export function posToLatLng(pos: Position): LatLng {
  let p = scale(pos);
  p = applyPosOffset(p);
  p = reverseY(p);

  return new LatLng(p.y, p.x);
}

export function latLngToPos(latLng: LatLng): Position {
  let p: ReverseYPosition = { x: latLng.lng, y: latLng.lat };
  p = reverseY(p) as Position;
  p = {
    x: p.x - MapOffset.x,
    y: p.y - MapOffset.y,
  };
  return descale(p);
}

export const GeoCountryMarkers = translation(CountryMarkers);
export const GeoRegionMarkers = translation(RegionMarkers);
export const GeoPlaceMarkers = translation(PlaceMarkers);

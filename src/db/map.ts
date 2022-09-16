import { registerMessage } from "../utils";
import { Position } from "../utils/mapPositionUtils";

export const MapZoomMin = 2.5;
export const MapZoomMax = 6;
export const MapBounds = [24, 8, 232, 184];

export type TMarker = {
  name: string;
  location: Position;
};

export type Markers = TMarker[];

export const CountryMarkers: Markers = [
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

export const RegionMarkers: Markers = [
  // region Mondstadt
  {
    name: registerMessage({ defaultMessage: "Starfell Valley" }),
    location: { x: 6.46, y: -10.67 },
  },
  {
    name: registerMessage({ defaultMessage: "Galesong Hill" }),
    location: { x: 7, y: 3.77 },
  },
  {
    name: registerMessage({ defaultMessage: "Brightcrown Mountains" }),
    location: { x: -9.42, y: -12.91 },
  },
  {
    name: registerMessage({ defaultMessage: "Windwail Highland" }),
    location: { x: -5.69, y: -3.62 },
  },
  {
    name: registerMessage({ defaultMessage: "Dragonspine" }),
    location: { x: -2.94, y: 9.02 },
  },
  // endregion

  // region Liyue
  {
    name: registerMessage({ defaultMessage: "Bishui Plain" }),
    location: { x: -22.94, y: 8.35 },
  },
  {
    name: registerMessage({ defaultMessage: "Qiongji Estuary" }),
    location: { x: -14.98, y: 20.09 },
  },
  {
    name: registerMessage({ defaultMessage: "Sea of Clouds" }),
    location: { x: -11.86, y: 35.33 },
  },
  {
    name: registerMessage({ defaultMessage: "Minlin" }),
    location: { x: -38.26, y: 21.26 },
  },
  {
    name: registerMessage({ defaultMessage: "Lisha" }),
    location: { x: -30.84, y: 38.07 },
  },
  {
    name: registerMessage({ defaultMessage: "The Chasm" }),
    location: { x: -41.45, y: 39.38 },
  },
  // endregion

  // region Inazuma
  {
    name: registerMessage({ defaultMessage: "Narukami Island" }),
    location: { x: 49.22, y: 70.4 },
  },
  {
    name: registerMessage({ defaultMessage: "Kannazuka" }),
    location: { x: 33.96, y: 79.97 },
  },
  {
    name: registerMessage({ defaultMessage: "Yashiori Island" }),
    location: { x: 16.52, y: 87.73 },
  },
  {
    name: registerMessage({ defaultMessage: "Watatsumi Island" }),
    location: { x: -1.62, y: 83.81 },
  },
  {
    name: registerMessage({ defaultMessage: "Seirai Island" }),
    location: { x: 47.51, y: 100.1 },
  },
  {
    name: registerMessage({ defaultMessage: "Tsurumi Island" }),
    location: { x: 27.87, y: 126.0 },
  },
  // endregion

  // region Sumeru
  {
    name: registerMessage({ defaultMessage: "Lokapala Jungle" }),
    location: { x: -51.52, y: 24.99 },
  },
  {
    name: registerMessage({ defaultMessage: "Avidya Forest" }),
    location: { x: -55.41, y: 36.24 },
  },
  {
    name: registerMessage({ defaultMessage: "Ardravi Valley" }),
    location: { x: -54.27, y: 53.13 },
  },
  {
    name: registerMessage({ defaultMessage: "Vanarana" }),
    location: { x: -68.69, y: 31.09 },
  },
  {
    name: registerMessage({ defaultMessage: "Vissudha Field" }),
    location: { x: -65.13, y: 35.25 },
  },
  {
    name: registerMessage({ defaultMessage: "Ashavan Realm" }),
    location: { x: -65.67, y: 48.24 },
  },
  {
    name: registerMessage({ defaultMessage: "Lost Nursery" }),
    location: { x: -75.08, y: 38.34 },
  },
  // endregion
];

export const PlaceMarkers: Markers = [
  {
    name: registerMessage({ defaultMessage: "Springvale" }),
    location: { x: -1.1, y: -2 },
  },
];

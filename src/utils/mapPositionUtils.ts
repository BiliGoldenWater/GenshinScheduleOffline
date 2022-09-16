import { LatLng } from "leaflet";

export const MapOffset: Position = { x: 134.3, y: 44 };
export const MapScale = 1;

export type Position = { x: number; y: number };
export type ReverseYPosition = { x: number; y: number };

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

import React, { memo } from "react";
import { TileLayer as TileLayerCore } from "react-leaflet";

const TileLayer = () => {
  return <TileLayerCore url={`/map/tiles/{z}/{x}_{y}.webp`} noWrap />;
};

export default memo(TileLayer);

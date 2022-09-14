import React, { CSSProperties, memo, ReactNode } from "react";
import { MapZoomMax, MapZoomMin, useConfig } from "../../utils/config";
import TileLayer from "./TileLayer";
import TaskLayer from "./TaskLayer";
import TaskCreateLayer from "./TaskCreateLayer";
import PositionSync from "./PositionSync";
import { MapContainer } from "react-leaflet";
import RegionLabelLayer from "./RegionLabelLayer";
import { Helmet } from "react-helmet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  const [{ lat, lng, zoom }] = useConfig("mapState");

  // adapted from https://github.com/GenshinMap/genshinmap.github.io/blob/master/js/index.js
  return (
    <>
      <MapHead />
      <MapContainer
        className="task-map"
        center={[lat, lng]}
        zoomDelta={0}
        zoomSnap={0.1}
        minZoom={MapZoomMin}
        maxZoom={MapZoomMax}
        zoom={zoom}
        maxBounds={[
          [6, 5],
          [-195, 250],
        ]}
        attributionControl={false}
        zoomControl={false}
        style={style}
        crs={CRS.Simple}
      >
        <TileLayer />
        <RegionLabelLayer />
        <TaskLayer />
        <TaskCreateLayer />
        <PositionSync />
        {/*<Marker position={[lat, lng]}></Marker>*/}

        {children}
      </MapContainer>
    </>
  );
};

const MapHead = () => (
  <Helmet>
    <style>
      {`
          /* https://github.com/Leaflet/Leaflet/issues/3575#issuecomment-688644225 */
          .leaflet-tile-container img {
            width: 256.5px !important;
            height: 256.5px !important;
          }
          
          .leaflet-container {
            background: none !important;
          }
          
          .leaflet-container .leaflet-pane {
            z-index: 1;
          }
          
          .task-map .leaflet-marker-pane .leaflet-marker-icon.task-marker-icon {
            background: white;
            padding: 0.25rem;
            border-radius: 9999px;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            object-fit: contain;
          }
          
          .task-map .leaflet-marker-pane .leaflet-marker-icon.region-label-icon {
            width: auto !important;
          }
          
          .task-map .leaflet-popup {
            font-family: Inter;
          }
          
          .task-map .leaflet-popup-content-wrapper {
            border: unset;
            border-radius: unset;
            background: unset;
            box-shadow: unset;
          }
          
          .task-map .leaflet-popup-content {
            margin: 0;
            min-width: 20rem;
          }
          
          .task-map .leaflet-popup-tip-container {
            margin-top: -2px;
          }
          `}
    </style>
  </Helmet>
);

export default memo(Map);

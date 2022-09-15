import React, { CSSProperties, memo, ReactNode } from "react";
import { useConfig } from "../../utils/config";
import TileLayer from "./TileLayer";
import TaskLayer from "./TaskLayer";
import TaskCreateLayer from "./TaskCreateLayer";
import PositionSync from "./PositionSync";
import { MapContainer } from "react-leaflet";
import RegionLabelLayer from "./RegionLabelLayer";
import { Helmet } from "react-helmet";
import "leaflet/dist/leaflet.css";
import { CRS } from "leaflet";
import { MapBounds, MapZoomMax, MapZoomMin } from "../../db/map";

const Map = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  let [{ lat, lng, zoom }] = useConfig("mapState");

  // let markerLatLng = posToLatLng({ x: 0, y: 0 });
  // adapted from https://github.com/GenshinMap/genshinmap.github.io/blob/master/js/index.js
  return (
    <>
      <MapHead />
      <MapContainer
        className="task-map"
        center={[lat, lng]}
        zoomDelta={0}
        zoomSnap={0.01}
        minZoom={MapZoomMin}
        maxZoom={MapZoomMax}
        zoom={zoom}
        maxBounds={[
          [MapBounds[1] * -1, MapBounds[0]],
          [MapBounds[3] * -1, MapBounds[2]],
        ]}
        attributionControl={false}
        zoomControl={false}
        style={style}
        crs={CRS.Simple}
      >
        <TileLayer />
        <RegionLabelLayer zoom={zoom} />
        <TaskLayer />
        <TaskCreateLayer />
        <PositionSync />
        {/*debug marker*/}
        {/*<Marker position={deLatLng(markerLatLng)}>*/}
        {/*  <Popup>*/}
        {/*    <div*/}
        {/*      style={{*/}
        {/*        backgroundColor: "white",*/}
        {/*        color: "black",*/}
        {/*        fontSize: " 2em",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {`x: ${latLngToPos(markerLatLng).x}`}*/}
        {/*      <br />*/}
        {/*      {`y: ${latLngToPos(markerLatLng).y}`}*/}
        {/*      <br />*/}
        {/*      {`zoom: ${zoom}`}*/}
        {/*    </div>*/}
        {/*  </Popup>*/}
        {/*</Marker>*/}

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

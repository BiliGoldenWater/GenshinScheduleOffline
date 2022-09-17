import React, { memo } from "react";
import { Marker } from "react-leaflet";
import { CRS, DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { IntlShape, useIntl } from "react-intl";
import {
  CountryMarkers,
  MapZoomMax,
  Markers,
  PlaceMarkers,
  RegionMarkers,
  TMarker,
} from "../../db/map";
import { Position, posToLatLng } from "../../utils/mapPositionUtils";

enum Level {
  Country = 3.3,
  Region = 5.3,
  Place = MapZoomMax,
}

const RegionLabelLayer = ({ zoom }: { zoom: number }) => {
  const intlShape = useIntl();

  let markers: Markers;
  let level: Level;
  if (zoom < Level.Country) {
    markers = CountryMarkers;
    level = Level.Country;
  } else if (zoom < Level.Region) {
    markers = RegionMarkers;
    level = Level.Region;
  } else {
    markers = PlaceMarkers;
    level = Level.Place;
  }

  return <>{markers.map((it) => buildMarker(it, level, zoom, intlShape))}</>;
};

function buildMarker(
  marker: TMarker,
  level: Level,
  zoom: number,
  { formatMessage: formatMessageId }: IntlShape
) {
  // region measure
  let root = document.getElementById("root")!;

  let label = renderToString(
    <RegionLabel
      zoom={zoom}
      name={formatMessageId({ id: marker.name })}
      level={level}
      transform={{ x: 0, y: 0 }}
    />
  );

  let measureContainer = document.createElement("div");
  measureContainer.innerHTML = label;

  let labelElement = measureContainer.firstElementChild! as HTMLDivElement;
  labelElement.style.display = "inline-block";

  root.appendChild(measureContainer);
  let rect = labelElement!.getBoundingClientRect();
  root.removeChild(measureContainer);
  // endregion

  label = renderToString(
    <RegionLabel
      zoom={zoom}
      name={formatMessageId({ id: marker.name })}
      level={level}
      transform={{
        x: rect.width * -0.5,
        y: rect.height * -0.5,
      }}
    />
  );

  let icon = new DivIcon({
    html: label,
    className: "region-label-icon",
  });

  return (
    <Marker
      key={`${marker.location.x}${marker.location.y}${marker.name}`}
      position={posToLatLng(marker.location)}
      zIndexOffset={-900}
      interactive={false}
      icon={icon}
    />
  );
}

const RegionLabel = ({
  zoom,
  name,
  level,
  transform,
}: {
  zoom: number;
  name: string;
  level: Level;
  transform: Position;
}) => {
  let fontSize = 1;
  switch (level) {
    case Level.Country: {
      fontSize = 4;
      break;
    }
    case Level.Region: {
      fontSize = 2.4;
      break;
    }
    case Level.Place: {
      fontSize = 1.6;
      break;
    }
  }
  fontSize *= CRS.Simple.scale(zoom) / CRS.Simple.scale(level);
  return (
    <div
      style={{
        fontSize: `${fontSize}rem`,
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        whiteSpace: "nowrap",
        wordBreak: "keep-all",
        color: "white",
        fontFamily: "Genshin",
        textAlign: "center",
        textShadow: "0px 0px 0.2rem black",
      }}
    >
      {name.split("\n").map((it) => (
        <>
          {it}
          <br />
        </>
      ))}
    </div>
  );
};

export default memo(RegionLabelLayer);

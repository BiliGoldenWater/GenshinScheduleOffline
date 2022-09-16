import React, { memo, ReactNode, useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { DivIcon, LatLng, LatLngTuple, Layer, Marker } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { chakra } from "@chakra-ui/react";
import { Config, useConfig } from "../../utils/config";
import { useIntl } from "react-intl";
import {
  GeoCountryMarkers,
  GeoPlaceMarkers,
  GeoRegionMarkers,
  MapZoomMax,
} from "../../db/map";

enum Level {
  Country = 3.8,
  Region = 5.3,
  Place = MapZoomMax,
}

const RegionLabelLayer = ({ zoom }: { zoom: number }) => {
  const { formatMessage: formatMessageId } = useIntl();
  const [renderId, setRenderId] = useState(0);
  const [state] = useConfig("mapState");

  useEffect(() => setRenderId((i) => i + 1), [state]);

  let markers;
  let level: Level;
  if (zoom < Level.Country) {
    markers = GeoCountryMarkers;
    level = Level.Country;
  } else if (zoom < Level.Region) {
    markers = GeoRegionMarkers;
    level = Level.Region;
  } else {
    markers = GeoPlaceMarkers;
    level = Level.Place;
  }

  return (
    <GeoJSON
      key={renderId}
      data={markers as any}
      pointToLayer={({ id }, latlng) =>
        pointToLayer(
          state,
          formatMessageId({ id: id?.toString() }),
          latlng,
          level
        )
      }
    />
  );
};

const pointToLayer = (
  map: Config["mapState"],
  name: string,
  latlng: LatLng,
  level: Level
): Layer => {
  const markerLatlng: LatLngTuple = [latlng.lng, latlng.lat]; // careful!! latlng swapped

  return new Marker(markerLatlng, {
    interactive: false,
    icon: new DivIcon({
      html: renderToStaticMarkup(
        <RegionLabel map={map} name={name} level={level} />
      ),
      className: "region-label-icon",
    }),
    zIndexOffset: -900,
  });
};

const RegionLabel = ({
  map,
  name,
  level,
}: {
  map: Config["mapState"];
  name: ReactNode;
  level: Level;
}) => {
  let fontSize;
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
  return (
    <chakra.div
      style={{
        fontSize: `${fontSize}rem`,
        transform: `scale(${map.zoom / level})`,
        whiteSpace: "nowrap",
        wordBreak: "keep-all",
        color: "white",
        position: "relative",
        top: "-290%",
        left: "-50%",
        fontFamily: "Genshin",
      }}
    >
      {name}
    </chakra.div>
  );
};

export default memo(RegionLabelLayer);

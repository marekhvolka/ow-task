import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import { api } from "~/utils/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

interface MapProps {
  apiKey: string;
  lat: number;
  lng: number;
}

const Map: React.FC<MapProps> = (props) => {
  const center = {
    lat: props.lat,
    lng: props.lng
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: props.apiKey,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      // onLoad={onLoad}
    >
      <Marker
        position={center}
      />
    </GoogleMap>
  ) : <></>
}

interface Props {
  lat: number;
  lng: number;
}

export const MapWrapper: React.FC<Props> = (props) => {
  const [apiKey, setApiKey] = React.useState<string | undefined>();

  api.common.getMapsApiKey.useQuery(undefined, {
    onSuccess: (data) => {
      setApiKey(data);
    },
  });

  if (!apiKey) {
    return <div>Loading...</div>;
  }

  return (
    <Map apiKey={apiKey} lat={props.lat} lng={props.lng} />
  );
}

export default React.memo(MapWrapper)
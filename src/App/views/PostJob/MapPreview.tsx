import { QuestionMark } from "@assets/images";
import L from "leaflet";
import { Map as MapLeaflet, Marker, TileLayer } from "react-leaflet";

export const MapPreview = ({
  coordinates = { lat: 52.2154531, lng: 21.0207946 },
  img = QuestionMark,
}) => {
  const pointerIcon = new L.Icon({
    iconUrl: img,
    iconRetinaUrl: img,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [40, 40],
  });
  return (
    <MapLeaflet center={coordinates} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={pointerIcon}></Marker>
    </MapLeaflet>
  );
};

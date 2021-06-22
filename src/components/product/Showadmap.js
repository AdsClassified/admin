import React, { useState } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyAQLhbqMNW1j54RhL_uDM5yvCXJTFSObE8');

const Showadmap = ({ data }) => {
  const [state, setState] = useState({
    address: '',
    zoom: 15,
    height: 500,
    mapPosition: {
      lat: data.mapPosition.lat,
      lng: data.mapPosition.lng
    },
    markerPosition: {
      lat: data.mapPosition.lat,
      lng: data.mapPosition.lng
    }
  });

  const MapWithAMarker = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={state.mapPosition}>
        {console.log(data)}
        <Marker
          //   draggable={true}
          //   onDragEnd={onMarkerDragEnd}
          position={state.markerPosition}
        />
      </GoogleMap>
    ))
  );
  return (
    <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQLhbqMNW1j54RhL_uDM5yvCXJTFSObE8&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default Showadmap;

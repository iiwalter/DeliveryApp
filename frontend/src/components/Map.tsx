import React from "react";
import {
  APIProvider,
  Map as GMap,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Customer } from "../types/customer";
import { useMapMarkers } from "../hooks/useMapMarkers";

interface MapProps {
  customers: Customer[];
}

export const Map: React.FC<MapProps> = React.memo(({ customers }) => {
  const { markers } = useMapMarkers(customers);

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAPS}>
      <GMap
        defaultCenter={{
          lat: customers[0]?.address.lat ?? -23.55552,
          lng: customers[0]?.address.long ?? -46.638308,
        }}
        defaultZoom={12}
        mapId="Customer_Delivery_Map"
      >
        {markers.map(({ customer, isSelected, onClick }) => (
          <AdvancedMarker
            key={customer.id}
            position={{ lat: customer.address.lat, lng: customer.address.long }}
            onClick={onClick}
          >
            <Pin
              key={customer.id}
              background={"#ec4899"}
              glyphColor={"#000"}
              borderColor={"#000"}
              glyph={!isSelected ? `${customer.id}` : null}
            >
              {isSelected && (
                <div className="bg-white rounded-lg p-2.5 justify-center">
                  <p className="text-xs">{customer.name}</p>
                  <p className="text-xs">{customer.packageWeight}kg</p>
                </div>
              )}
            </Pin>
          </AdvancedMarker>
        ))}
      </GMap>
    </APIProvider>
  );
});

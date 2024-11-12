import { useState, useCallback, useMemo } from "react";
import { Customer } from "../types/customer";

export const useMapMarkers = (customers: Customer[]) => {
  const [clickedMark, setClickedMark] = useState<Customer | undefined>();

  const handleMarkerClick = useCallback(
    (customer: Customer) => {
      if (clickedMark && clickedMark.id === customer.id) {
        setClickedMark(undefined);
      } else {
        setClickedMark(customer);
      }
    },
    [clickedMark]
  );

  const markers = useMemo(
    () =>
      customers.map((customer) => ({
        customer,
        isSelected: clickedMark?.id === customer.id,
        onClick: () => handleMarkerClick(customer),
      })),
    [customers, clickedMark, handleMarkerClick]
  );

  return { markers, clickedMark };
};

import React from "react";
import { Form } from "../../../components/Form";
import { Customer } from "../../../types/customer";
import { useGeolocation } from "../../../hooks/useGeolocation";

interface GeolocationProps {
  onSubmit: (customer: Customer) => Promise<boolean>;
  handleResetCustomers: () => Promise<void>;
}

const GeolocationFormWrapper: React.FC<GeolocationProps> = ({
  onSubmit,
  handleResetCustomers,
}) => {
  const { handleSearchAddress } = useGeolocation();

  return (
    <Form
      handleSearchAddress={handleSearchAddress}
      handleResetCustomers={handleResetCustomers}
      onSubmit={onSubmit}
    />
  );
};

export default GeolocationFormWrapper;

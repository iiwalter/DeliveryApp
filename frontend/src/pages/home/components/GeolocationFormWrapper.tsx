import React from "react";
import { Form } from "../../../components/Form";
import { Customer } from "../../../types/customer";
import { useGeolocation } from "../../../hooks/useGeolocation";
import { Loading } from "../../../components/Loading";

interface GeolocationProps {
  onSubmit: (customer: Customer) => Promise<boolean>;
  handleResetCustomers: () => Promise<void>;
}

const GeolocationFormWrapper: React.FC<GeolocationProps> = ({
  onSubmit,
  handleResetCustomers,
}) => {
  const { searchAddress, loading, error } = useGeolocation();

  const handleSearchAddress = async (inlineAddress: string) => {
    const address = await searchAddress(inlineAddress);
    if (!address) alert(error || "Erro ao buscar endereço.");
    return address;
  };

  return (
    <>
      {loading && <Loading />}
      <Form
        handleSearchAddress={handleSearchAddress}
        handleResetCustomers={handleResetCustomers}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default GeolocationFormWrapper;

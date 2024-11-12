import { getGeolocation } from "../services/api";
import { Address } from "../types/address";
import { useApi } from "./useApi";

export const useGeolocation = () => {
  const {
    data: address,
    loading,
    error,
    fetchData,
  } = useApi<Address | null>(getGeolocation, null, false);

  const searchAddress = async (
    inlineAddress: string
  ): Promise<Address | null> => {
    try {
      await fetchData(inlineAddress);
      return address;
    } catch (err: any) {
      return null;
    }
  };

  return { address, loading, error, searchAddress };
};

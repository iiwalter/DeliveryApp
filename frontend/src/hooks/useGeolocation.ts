import { getGeolocation } from "../services/api";
import { Address } from "../types/address";

interface UseGeolocation {
  handleSearchAddress: (inlineAddress: string) => Promise<Address>;
}

export const useGeolocation = (): UseGeolocation => {
  const handleSearchAddress = async (inlineAddress: string) => {
    try {
      const addressData = await getGeolocation(inlineAddress);
      return addressData;
    } catch (err: any) {
      alert(`Erro ao buscar endereço: ${err.message ?? "tente novamente"}`);
    }
    return null;
  };
  return { handleSearchAddress };
};

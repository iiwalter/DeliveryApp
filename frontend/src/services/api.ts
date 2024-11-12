import axios from "axios";
import { Customer } from "../types/customer";
import { Address } from "../types/address";

const API_URL = "http://localhost:8080";

const defaultError = (message: any, inputError?: boolean) =>
  `${message} ${inputError ? "- Verifique os dados inseridos" : ""}`;

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get<Customer[]>(`${API_URL}/customers`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      defaultError(error?.response?.data?.message) || "Erro ao buscar clientes"
    );
  }
};

export const deleteCustomers = async () => {
  try {
    await axios.delete(`${API_URL}/customers`);
  } catch (error: any) {
    throw new Error(
      defaultError(error?.response?.data?.message) || "Erro ao excluir cliente"
    );
  }
};

export const createCustomer = async (customer: Customer) => {
  try {
    await axios.post(`${API_URL}/customers`, customer);
    return;
  } catch (error: any) {
    throw new Error(
      defaultError(error?.response?.data?.message, true) ||
        "Erro ao criar cliente"
    );
  }
};

export const getGeolocation = async (
  inlineAddress: string
): Promise<Address> => {
  try {
    const response = await axios.get<Address>(
      `${API_URL}/geolocation/${inlineAddress}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      defaultError(error?.response?.data?.message) ||
        "Erro ao obter geolocalização"
    );
  }
};

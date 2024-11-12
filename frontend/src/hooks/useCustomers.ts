import { useState, useEffect } from "react";
import { useApi } from "./useApi";
import { Customer } from "../types/customer";
import { getCustomers, deleteCustomers, createCustomer } from "../services/api";
import { useErrorHandler } from "./useErrorHandler";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const { data, loading: apiLoading, error: isError } = useApi(getCustomers);
  const { error, handleError } = useErrorHandler();

  useEffect(() => {
    if (data) {
      setCustomers(data);
    }
  }, [data]);

  const addCustomer = async (newCustomer: Customer) => {
    setLoading(true);
    try {
      await createCustomer(newCustomer);
      const updatedCustomers = await getCustomers();
      setCustomers(updatedCustomers);
      return true;
    } catch (error: any) {
      handleError(error?.message || "Erro ao adicionar cliente");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeAllCustomers = async () => {
    setLoading(true);
    try {
      await deleteCustomers();
      setCustomers([]);
    } catch (error: any) {
      handleError(error?.message || "Erro ao deletar clientes");
    } finally {
      setLoading(false);
    }
  };

  return {
    customers,
    loading: loading || apiLoading,
    error: error || isError,
    addCustomer,
    removeAllCustomers,
  };
};

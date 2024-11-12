import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors, UseFormGetValues } from "react-hook-form";
import { Address } from "../types/address";
import { Customer } from "../types/customer";

interface UseCustomerFormProps {
  onSubmit: (customer: Customer) => Promise<boolean>;
  handleSearchAddress: (inlineAddress: string) => Promise<Address | null>;
  handleResetCustomers: () => Promise<void>;
}

interface UseCustomerFormReturn {
  register: ReturnType<typeof useForm<Customer>>["register"];
  handleSubmit: ReturnType<typeof useForm<Customer>>["handleSubmit"];
  errors: FieldErrors<Customer>;
  inlineAddress: string;
  showAddressForm: boolean;
  onSubmitForm: SubmitHandler<Customer>;
  handleAddressChange: () => Promise<void>;
  handleReset: () => Promise<void>;
  setInlineAddress: React.Dispatch<React.SetStateAction<string>>;
  getValues: UseFormGetValues<Customer>;
}

export const useCustomerForm = ({
  onSubmit,
  handleSearchAddress,
  handleResetCustomers,
}: UseCustomerFormProps): UseCustomerFormReturn => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Customer>();

  const [inlineAddress, setInlineAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

  const onSubmitForm: SubmitHandler<Customer> = async (data) => {
    if (data.address == null) {
      alert("Por favor, insira um endereço válido e faça a busca");
    } else {
      const custo = {
        ...data,
        address: { ...data.address, number: Number(data.address.number) },
      };
      const submited = await onSubmit(custo);
      if (submited) resetForm();
    }
  };

  const handleAddressChange = async () => {
    if (inlineAddress.length > 5) {
      const address = await handleSearchAddress(inlineAddress);
      if (address) {
        setValue("address", address);
        setShowAddressForm(true);
      }
    } else {
      alert("endereço inválido. Por favor, insira um endereço válido.");
    }
  };

  const handleReset = async () => {
    await handleResetCustomers();
    resetForm();
  };

  const resetForm = () => {
    reset();
    setInlineAddress("");
    setShowAddressForm(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    inlineAddress,
    showAddressForm,
    onSubmitForm,
    handleAddressChange,
    handleReset,
    setInlineAddress,
    getValues,
  };
};

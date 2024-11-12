import React from "react";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { Address } from "../types/address";
import { Customer } from "../types/customer";
import { Card } from "./Card";
import { CustomerForm } from "./CustomerForm";
import { AddressForm } from "./AddressForm";
import { FieldErrors } from "react-hook-form";

interface FormProps {
  onSubmit: (customer: Customer) => Promise<boolean>;
  handleSearchAddress: (inlineAddress: string) => Promise<Address | null>;
  handleResetCustomers: () => Promise<void>;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  handleSearchAddress,
  handleResetCustomers,
}) => {
  const {
    errors,
    inlineAddress,
    showAddressForm,
    register,
    handleSubmit,
    onSubmitForm,
    handleAddressChange,
    handleReset,
    setInlineAddress,
    getValues,
  } = useCustomerForm({
    onSubmit,
    handleSearchAddress,
    handleResetCustomers,
  });

  return (
    <div className="p-4">
      <Card>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <CustomerForm register={register} errors={errors} />

          <AddressForm
            register={register}
            errors={(errors.address as FieldErrors<Address>) ?? {}}
            handleInlineAddressSearch={handleAddressChange}
            showAddressForm={showAddressForm}
            getValues={getValues}
            inlineAddress={inlineAddress}
            setInlineAddress={setInlineAddress}
          />

          <button
            type="submit"
            className="w-[100%] mx-auto px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Salvar Cliente
          </button>
        </form>
      </Card>
      <Card>
        <button
          type="button"
          onClick={handleReset}
          className="w-[100%] mx-auto px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Resetar Cadastros
        </button>
      </Card>
    </div>
  );
};

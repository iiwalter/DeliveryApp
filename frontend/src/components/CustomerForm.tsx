import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Customer } from "../types/customer";

interface CustomerFormProps {
  register: UseFormRegister<Customer>;
  errors: FieldErrors<Customer>;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ register, errors }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          {...register("name", {
            required: "Nome é obrigatório",
            minLength: {
              value: 3,
              message: "Nome deve ter pelo menos 3 caracteres",
            },
          })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Peso</label>
        <input
          type="number"
          {...register("packageWeight", {
            required: "Peso é obrigatório",
            valueAsNumber: true,
            min: { value: 0.1, message: "Peso deve ser maior que 0" },
          })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
        {errors.packageWeight && (
          <p className="text-red-500 text-sm">{errors.packageWeight.message}</p>
        )}
      </div>
    </>
  );
};

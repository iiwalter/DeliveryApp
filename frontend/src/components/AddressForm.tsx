import React from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { Address } from "../types/address";
import { Customer } from "../types/customer";

interface AddressFormProps {
  handleInlineAddressSearch: () => Promise<void>;
  register: UseFormRegister<Customer>;
  errors: FieldErrors<Address>;
  showAddressForm: boolean;
  getValues: UseFormGetValues<Customer>;
  inlineAddress: string;
  setInlineAddress: (addr: string) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  handleInlineAddressSearch,
  register,
  errors,
  showAddressForm,
  getValues,
  inlineAddress,
  setInlineAddress,
}) => {
  return (
    <div className="space-y-1">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Endereço
        </label>
        <div className="flex relative">
          <input
            type="text"
            value={inlineAddress}
            onChange={(e) => setInlineAddress(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Digite o endereço"
          />
          <span
            onClick={handleInlineAddressSearch}
            className="text-blue-500 cursor-pointer top-3 absolute right-4 hover:underline"
          >
            Buscar
          </span>
        </div>
      </div>
      {showAddressForm && (
        <div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Rua
              </label>
              <input
                type="text"
                {...register("address.street", {
                  required: "Rua é obrigatório",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Bairro
              </label>
              <input
                type="text"
                {...register("address.neighborhood", {
                  required: "Bairro é obrigatório",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.neighborhood && (
                <p className="text-red-500 text-sm">
                  {errors.neighborhood.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 pt-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Número
              </label>
              <input
                type="number"
                {...register("address.number", {
                  required: "Número é obrigatório",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Complemento
              </label>
              <input
                type="text"
                {...register("address.complement")}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-3 pt-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Cidade
              </label>
              <input
                type="text"
                {...register("address.city", {
                  required: "Cidade é obrigatório",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <input
                type="text"
                {...register("address.state", {
                  required: "Estado é obrigatório",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                País
              </label>
              <input
                type="text"
                {...register("address.country", {
                  required: "País é obrigatório",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                value={getValues("address.lat")}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                value={getValues("address.long")}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

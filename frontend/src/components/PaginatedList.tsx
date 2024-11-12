import React, { useMemo } from "react";
import ReactPaginate from "react-paginate";
import { Customer } from "../types/customer";
import { usePagination } from "../hooks/usePagination";
import {
  calculateAverageTicket,
  calculateTotalCustomers,
  calculateTotalWeight,
} from "../utils/calc";

interface ListProps {
  customers: Customer[];
}

const Cell: React.FC<{ children: React.ReactNode; bold?: boolean }> = ({
  children,
  bold,
}) => (
  <td className={`border px-4 py-2 text-left ${bold ? "font-bold" : ""}`}>
    {children}
  </td>
);

export const List: React.FC<ListProps> = ({ customers }) => {
  const itemsPerPage = 3;
  const paginationStyle =
    "px-3 py-1 rounded-md cursor-pointer bg-pink-500 border bg-pink-500";

  const { handlePageClick, paginatedCustomers } = usePagination(
    customers,
    itemsPerPage
  );

  const totalCustomers = useMemo(
    () => calculateTotalCustomers(customers),
    [customers]
  );
  const totalWeight = useMemo(
    () => calculateTotalWeight(customers),
    [customers]
  );
  const averageTicket = useMemo(
    () => calculateAverageTicket(customers),
    [customers]
  );

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-row justify-around">
        <p>
          <strong>Clientes Totais:</strong> {totalCustomers}
        </p>
        <p>
          <strong>Peso Total:</strong> {totalWeight.toFixed(2)} kg
        </p>
        <p>
          <strong>Ticket Médio:</strong> {averageTicket}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <Cell bold>Nome</Cell>
              <Cell bold>Rua</Cell>
              <Cell bold>Cidade</Cell>
              <Cell bold>País</Cell>
              <Cell bold>Peso</Cell>
              <Cell bold>Latitude</Cell>
              <Cell bold>Longitude</Cell>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer, index) => {
              return (
                <tr key={index}>
                  <Cell>{customer.name}</Cell>
                  <Cell>{customer.address.street}</Cell>
                  <Cell>{customer.address.city}</Cell>
                  <Cell>{customer.address.country}</Cell>
                  <Cell>{`${customer.packageWeight} kg`}</Cell>
                  <Cell>{customer.address.lat}</Cell>
                  <Cell>{customer.address.long}</Cell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {customers.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próxima"}
          breakLabel={"..."}
          pageCount={Math.ceil(customers.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center mt-4 space-x-2"
          activeClassName="px-3 py-1 rounded-md cursor-pointer bg-pink-600 border text-white"
          pageClassName="px-3 py-1 rounded-md cursor-pointer"
          previousClassName={paginationStyle}
          nextClassName={paginationStyle}
          disabledClassName="text-white border-gray-300 bg-pink-200 cursor-not-allowed"
        />
      )}
    </div>
  );
};

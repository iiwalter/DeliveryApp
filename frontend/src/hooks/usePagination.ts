import { useState } from "react";
import { Customer } from "../types/customer";
import { paginateCustomers } from "../utils/calc";

export const usePagination = (customers: Customer[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data: { selected: number }) =>
    setCurrentPage(data.selected);

  const paginatedCustomers = paginateCustomers(
    customers,
    currentPage,
    itemsPerPage
  );

  return { handlePageClick, paginatedCustomers };
};

import { Customer } from "../types/customer";

export const calculateTotalCustomers = (customers: Customer[]) => {
  return customers.length;
};

export const calculateTotalWeight = (customers: Customer[]) => {
  return customers.reduce((acc, customer) => acc + customer.packageWeight, 0);
};

export const calculateAverageTicket = (customers: Customer[]) => {
  const totalCustomers = customers.length;
  const totalWeight = calculateTotalWeight(customers);
  return totalCustomers
    ? (totalWeight / totalCustomers).toFixed(2).replace(".", ",")
    : "0,00";
};

export const paginateCustomers = (
  customers: Customer[],
  currentPage: number,
  itemsPerPage: number
) => {
  return customers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
};

import { Header } from "../../components/Header";
import { useCustomers } from "../../hooks/useCustomers";
import { Error } from "../../components/Error";
import CustomersContentWrapper from "./components/CustomersContentWrapper";
import GeolocationFormWrapper from "./components/GeolocationFormWrapper";

export function Home() {
  const { customers, loading, error, addCustomer, removeAllCustomers } =
    useCustomers();

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col">
      <Header />
      {error && <Error message={error} />}
      <div className="flex-grow flex flex-col md:flex-row gap-6 p-6">
        <div className="md:w-1/3 bg-white border border-gray-300 p-4 rounded-lg">
          <GeolocationFormWrapper
            handleResetCustomers={removeAllCustomers}
            onSubmit={addCustomer}
          />
        </div>
        <CustomersContentWrapper loading={loading} customers={customers} />
      </div>
    </div>
  );
}

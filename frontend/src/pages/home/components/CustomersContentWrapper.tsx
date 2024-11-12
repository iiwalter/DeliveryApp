import { Loading } from "../../../components/Loading";
import { Map } from "../../../components/Map";
import { List } from "../../../components/PaginatedList";
import { Customer } from "../../../types/customer";

interface CustomersContentWrapperProps {
  loading: boolean;
  customers: Customer[];
}

const CustomersContentWrapper = ({
  loading,
  customers,
}: CustomersContentWrapperProps) => {
  return (
    <div className="flex flex-col md:w-2/3 gap-4">
      {loading && <Loading />}
      <div className="flex-grow bg-gray-200 rounded-lg h-64 md:h-full">
        <Map customers={customers} />
      </div>
      {customers.length > 0 && (
        <div className="bg-white border border-gray-300 p-4 rounded-lg">
          <List customers={customers} />
        </div>
      )}
    </div>
  );
};

export default CustomersContentWrapper;

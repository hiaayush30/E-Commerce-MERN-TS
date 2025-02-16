import CustomersTable from "../components/tables/CustomersTable"

const Customers = () => {
  return (
    <div className="p-8 h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold my-5">
        Customers
      </h1>
      <div>
        <CustomersTable/>
      </div>
    </div>
  )
}

export default Customers

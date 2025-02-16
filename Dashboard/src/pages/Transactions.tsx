import TransactionTable from "../components/tables/TransactionTable"
import '../components/tables/TransactionTable.css'

const Transactions = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <h1 className="text-2xl px-5 pt-5 mt-10 font-semibold">Transactions</h1>
      <div className="m-5">
        <TransactionTable/>
      </div>
    </div>
  )
}

export default Transactions

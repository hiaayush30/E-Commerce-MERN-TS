import { Link } from "react-router-dom"
import ProductsTable from "../components/tables/ProductsTable"
import { FaPlus } from "react-icons/fa"

const Products = () => {
  return (
    <div className="p-10">
      <div className="flex items-center justify-between my-5">
        <h1 className="text-2xl font-semibold my-1">Products</h1>
        <Link className="bg-red-700 text-white rounded-full p-2"
        to={'/admin/product/new'}>
          <FaPlus />
        </Link>
      </div>
      <div className="overflow-x-auto bg-slate-100">
      <ProductsTable />
      </div>

    </div>
  )
}

export default Products

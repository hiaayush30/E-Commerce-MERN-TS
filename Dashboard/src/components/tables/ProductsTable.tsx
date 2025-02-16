import { Column } from "react-table";
import TableHOC from "../TableHOC"
import './ProductsTable.css'
import { ReactElement, useCallback, useState } from "react";
import { Link } from "react-router-dom";

const arr = Array.from({ length: 50 }, (_, index) => {
    return ({
        photo: <img className="h-15 mx-auto" src="https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg" alt="laptop"/>,
        name: "jkvntr5v",
        price: Math.ceil(Math.random() * 2000),
        stock: index,
        action: <Link className="bg-blue-200 p-1 rounded-lg hover:bg-blue-100"
        to={'/admin/product/'+index}>Manage</Link>
    })
})

interface DataType {
    photo: ReactElement;
    name: string;
    price: number;
    stock: number;
    action: ReactElement;
}
const columns: Column<DataType>[] = [
    {
        Header: "Photo",
        accessor: 'photo'
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
    {
        Header: 'Stock',
        accessor: 'stock',
    },
    {
        Header: 'Action',
        accessor: 'action',
    }
]

const ProductsTable = () => {
    const [data, setData] = useState<DataType[]>(arr);
    const table = TableHOC(columns, data, "productsTable",true)
    return table()
}

export default ProductsTable

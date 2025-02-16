import { ReactElement } from "react";
import TableHOC from "../TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";

interface DataType {
    user:string;
    amount:number;
    discount:number;
    quantity:number;
    status:ReactElement
    action:ReactElement
}

const data:DataType[] = Array.from({length:10},(_,index)=>{
    return({
        user:"tester"+index,
        amount:Math.random()*1000,
        discount:(index+1)*10,
        quantity:index,
        status:<span className="text-red-500">processing</span>,
        action:<Link to={'/admin/transaction/'+index} className="mx-auto hover:bg-blue-200 cursor-pointer bg-blue-300 p-1 rounded-lg">Manage</Link>
    })
})

const columns:Column<DataType>[]=[
    {
        Header:'User',
        accessor:'user'
    },
    {
        Header:'Amount',
        accessor:'amount'
    },
    {
        Header:'Discount',
        accessor:'discount'
    },
    {
        Header:'Quantity',
        accessor:'quantity'
    },
    {
        Header:'Status',
        accessor:'status'
    },
    {
        Header:"Action",
        accessor:'action'
    }
]

const TransactionTable = () => {
  return (
          TableHOC(columns,data,"transactions",true)()
  )
}

export default TransactionTable

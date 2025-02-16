import { ReactElement } from "react"
import TableHOC from "../TableHOC"
import { MdDelete } from "react-icons/md";
import { Column } from "react-table";
import './CustomersTable.css'

interface DataType{
    avatar:ReactElement,
    name:string;
    gender:string;
    email:string;
    role:string;
    action:ReactElement;
}
const data:DataType[]=Array.from({length:20},()=>{
    return ({
        avatar:<img className="h-14 w-14 rounded-full object-cover mx-auto" src="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"/>,
        name:"Bob",
        gender:"male",
        email:"bob@gmail.com",
        role:"user",
        action:<MdDelete className="hover:scale-105 cursor-pointer mx-auto" color="red" />
    })
})
const columns:Column<DataType>[]=[
    {
        Header:'Avatar',
        accessor:'avatar'
    },
    {
        Header:'Name',
        accessor:'name'
    },
    {
        Header:'Gender',
        accessor:'gender'
    },
    {
        Header:'Email',
        accessor:'email'
    },
    {
        Header:'Role',
        accessor:'role'
    },
    {
        Header:'Action',
        accessor:'action'
    }
]

const CustomersTable = () => {
  return (
    TableHOC(columns,data,"customersTable",true)()
  )
}

export default CustomersTable

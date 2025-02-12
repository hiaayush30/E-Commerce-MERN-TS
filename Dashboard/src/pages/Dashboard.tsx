import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline, IoMdTrendingDown } from "react-icons/io";
import ProfilePic from '../assets/profile.jpeg';
import { IoMdTrendingUp } from "react-icons/io"
import { motion } from 'motion/react';
import { BarChart } from "../components/Charts";
const Dashboard = () => {
  return (
    <div className="">
      <header className="flex  justify-around items-center w-[95%] mx-auto py-1 pb-1 border-b-1 mb-5">
        <div className="flex gap-1 items-center w-[85%]">
          <IoSearch className="text-xl" />
          <input className="outline-none p-1 w-full"
            type="text" placeholder="Search for data, users, docs" />
        </div>
        <div className="flex gap-3 items-center text-xl">
          <IoMdNotificationsOutline className="cursor-pointer" />
          <img className="h-6 w-6 md:h-8 md:w-8 rounded-full"
            src={ProfilePic} alt="User" />
        </div>
      </header>
      <main>
        <section className="grid grid-cols-4 gap-5 px-1">
          <WidgetItem heading="Revenue" percent={40} amount={true} value={340000} />
          <WidgetItem heading="Users" percent={-14} amount={false} value={400} />
          <WidgetItem heading="Transactions" percent={80} amount={false} value={23000} />
          <WidgetItem heading="Products" percent={30} amount={false} value={1000} />
        </section>
        <section className="my-5">
          <div className="grid grid-cols-[3fr_1fr] gap-2 px-2">
            <div className="p-1 text-2xl mx-auto bg-slate-100 w-full rounded-md min-h-[50vh] flex flex-col justify-start items-center">
              REVENUE AND TRANSACTIONS
              <BarChart data_1={[300,144,433,655,237,755,190]}
              data_2={[200,444,343,556,778,455,990]}
              title_1="Revenue"
              title_2="Transactions"
              bgColor1="rgb(0,115,255)"
              bgColor2="rgba(53,162,235,0.8)"
              />
            </div>
            <div className="mx-auto bg-slate-100 w-full rounded-md min-h-[50vh] flex flex-col justify-center items-center">
              <h2 className="mb-5 text-2xl p-1">INVENTORY</h2>
              <InventoryItem name="Laptops" color="green" percent={40} />
              <InventoryItem name="Shoes" color="orange" percent={100} />
              <InventoryItem name="Cameras" color="purple" percent={80} />
              <InventoryItem name="Jeans" color="navy" percent={40} />
              <InventoryItem name="Jeans" color="navy" percent={60} />
              <InventoryItem name="Jeans" color="navy" percent={60} />
              <InventoryItem name="Jeans" color="navy" percent={60} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  amount?: boolean;
}

const WidgetItem = (props: WidgetItemProps) => (
  <div className="shadow-md p-2 bg-slate-100 rounded-md mx-auto flex items-center gap-1">
    <div className="flex flex-col">
      <h3 className="text-sm"
      >{props.heading}</h3>
      <div className="font-semibold text-2xl">{props.amount ? '$' : ''}{props.value}</div>
      <div className="flex gap-1 items-center">
        {props.percent > 0 ?
          <><IoMdTrendingUp className="text-green" /><span>+{props.percent}%</span></> :
          <><IoMdTrendingDown className="text-red-500" /><span>{props.percent}%</span></>}

      </div>
    </div>
    <motion.div
      initial={{
        background: `conic-gradient(
        hsl(0%,0%,0%) 0 deg,
        rgb(226, 232, 240) 0`
      }}
      animate={{
        background: `conic-gradient(
        hsl(${props.percent*4}%,${props.percent}%,50%) ${3.16 * Math.abs(props.percent)}deg,
        rgb(226, 232, 240) 0`
      }}
      transition={{
        duration: 1
      }}
      className="h-18 w-18 rounded-full relative flex items-center justify-center bg-center bg-blue-300">
      <div className="h-16 w-16 rounded-full grid place-items-center bg-slate-100">
        {props.percent}
      </div>
    </motion.div>
  </div>)

interface InventoryProps {
  name: string;
  percent: number;
  color:string
}
const InventoryItem = ({name,percent}:InventoryProps) => (
       <div className="flex gap-5 items-center">
        <h3 className="text-sm">{name}</h3>
        <div>
          <motion.div className="w-18 h-2 relative bg-slate-300 rounded-lg">
            <motion.div
            initial={{
              backgroundColor:`hsl(0%,0%,0%)`,
              width:`0%`
            }}
            animate={{
              backgroundColor:`hsl(${percent*3}%,${percent}%,50%)`,
              width:`${percent}%`
            }}
            transition={{
              duration:1
            }}
            className={`absolute rounded-lg h-2`}></motion.div>
          </motion.div>
        </div>
        <span className="text-sm">{percent}%</span>
       </div>
  )

export default Dashboard

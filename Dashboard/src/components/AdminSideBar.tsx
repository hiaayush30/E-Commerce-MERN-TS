import { MdDashboard } from "react-icons/md";
import { FaChartLine, FaChartPie, FaShoppingBag } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaStopwatch } from "react-icons/fa6";
import { RiCoinFill } from "react-icons/ri";
import { IconType } from "react-icons";

const AdminSideBar = () => {
  return (
    <aside className="w-full flex flex-col bg-[#E8F9FF] h-full">
      <h2 className="text-3xl p-2 font-semibold">Logo.</h2>
      <div className="ml-5 mr-3">
        <h3 className="text-lg mt-2">DASHBOARD</h3>
        <ul className="mr-2 my-1">
          <SidebarOptions icon={MdDashboard} text="Dashboard" url="/admin/dashboard" />
          <SidebarOptions icon={FaShoppingBag} text="Products" url="/admin/products" />
          <SidebarOptions icon={IoIosPeople} text="Customers" url="/admin/customers" />
          <SidebarOptions icon={LuNotebookPen} text="Transactions" url="/admin/transactions" />
        </ul>
        <h3 className="mt-3">CHARTS</h3>
        <ul className="mr-2">
          <SidebarOptions icon={FaChartBar} text="Bar" url="/admin/charts/bar" />
          <SidebarOptions icon={FaChartPie} text="Pie" url="/admin/charts/pie" />
          <SidebarOptions icon={FaChartLine} text="Line" url="/admin/charts/line" />
        </ul>
        <h3 className="mt-3">APPS</h3>
        <ul className="mr-2">
          <SidebarOptions icon={FaStopwatch} text="Stopwatch" url="/admin/apps/stopwatch" />
          <SidebarOptions icon={RiCoupon2Fill} text="Coupon" url="/admin/apps/coupon" />
          <SidebarOptions icon={RiCoinFill} text="Toss" url="/admin/apps/toss" />
        </ul>
      </div>
    </aside >
  )
}

interface OptionsProps {
  url: string;
  text: string;
  icon: IconType;
}
// const SidebarOptions = (props: OptionsProps) => {
//   return <NavLink to={props.url}
//     className={({ isActive }) => `${isActive ? 'bg-[#7E60BF] text-[#FFE1FF]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
//   >
//     <props.icon />
//     <span>{props.text}</span>
//   </NavLink>
// }

//or
const SidebarOptions = (props: OptionsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return <li
    onClick={() => navigate(props.url)}
    className={`${location.pathname == props.url ? 'bg-[#7E60BF] text-[#FFE1FF]' : 'hover:bg-[#D6CCF7]'} flex items-center gap-2 rounded-md p-1 m-1 cursor-pointer`}
  >
    <props.icon />
    <span>{props.text}</span>
  </li>
}
export default AdminSideBar

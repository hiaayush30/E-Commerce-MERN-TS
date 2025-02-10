import { MdDashboard } from "react-icons/md";
import { FaChartLine, FaChartPie, FaShoppingBag } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaStopwatch } from "react-icons/fa6";
import { RiCoinFill } from "react-icons/ri";

const AdminSideBar = () => {
  return (
    <aside className="w-full flex flex-col bg-[#E7D4B5]">
      <h2 className="text-3xl p-2 font-semibold">Logo.</h2>
      <div className="ml-5 mr-3">
        <h3 className="text-lg">DASHBOARD</h3>
        <div className="mr-2">
          <NavLink className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
            to={'/admin/dashboard'}>
            <MdDashboard />
            <span>Dashboard</span>
          </NavLink>
          <NavLink className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
            to={'/admin/products'}>
            <FaShoppingBag />
            <span>Products</span>
          </NavLink>
          <NavLink className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
            to={'/admin/customers'}>
            <IoIosPeople />
            <span>Customers</span>
          </NavLink>
          <NavLink className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
            to={'/admin/transactions'}>
            <LuNotebookPen />
            <span>Transaction</span>
          </NavLink>
        </div>
        <h3>CHARTS</h3>
        <div>
          <NavLink to={'/admin/bar'}
            className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
          >
            <FaChartBar />
            <span>Bar</span>
          </NavLink>
          <NavLink to={'/admin/pie'}
            className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
          >
            <FaChartPie />
            <span>Pie</span>
          </NavLink>
          <NavLink to={'/admin/line'}
            className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
          >
            <FaChartLine />
            <span>Line</span>
          </NavLink>
        </div>
        <h3>APPS</h3>
        <div>
          <NavLink to={'/admin/stopwatch'}
            className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
          >
            <FaStopwatch />
            <span>Stopwatch</span>
          </NavLink>
          <NavLink to={'/admin/coupon'}
            className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
          >
            <RiCoupon2Fill />
            <span>Coupon</span>
          </NavLink>
          <NavLink to={'/admin/toss'}
            className={({ isActive }) => `${isActive ? 'bg-[#B6C7AA] text-[#556d2a]' : ''} flex items-center gap-2 rounded-md p-1 m-1`}
          >
            <RiCoinFill />
            <span>Toss</span>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default AdminSideBar

import { Outlet } from "react-router-dom"
import AdminSideBar from "./components/AdminSideBar"

const Layout = () => {
    return (
        <div className="grid grid-cols-[1fr_4fr] grid-rows-1 overflow-y-auto scrollbar-hide bg-[#B6C7AA] text-slate-800 min-h-screen">
            <AdminSideBar />
            <Outlet />
        </div>
    )
}

export default Layout

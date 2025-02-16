import { Outlet } from "react-router-dom"
import AdminSideBar from "./components/AdminSideBar"

const Layout = () => {
    return (
        <div className="relative font-display grid grid-cols-[1fr_4fr] max-md:grid-cols-1 grid-rows-1 overflow-y-hidden bg-[#c4d9ffc0] text-slate-800 min-h-screen">
            <div className="max-md:hidden">
                <AdminSideBar />
            </div>
            <div className="overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout

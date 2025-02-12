import { Outlet } from "react-router-dom"
import AdminSideBar from "./components/AdminSideBar"

const Layout = () => {
    return (
        <div className="font-display grid grid-cols-[1fr_4fr] grid-rows-1 overflow-y-hidden bg-[#c4d9ffc0] text-slate-800 min-h-screen">
            <AdminSideBar />
            <div className="overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout

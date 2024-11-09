import { Outlet } from "react-router-dom"
import Sidebar from "../UI/Layout/Dashboard/Sidebar"
import { NavBar } from "../UI/Layout/Dashboard/NavBar"


export const HomeDashboard = () => {
    return (
        <section className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <NavBar />
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

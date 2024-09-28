import { Outlet } from "react-router-dom"
import { Nav } from "../UI/Layout/User/Nav"

export const HomeUser = () => {
    return (

        <>
            <Nav />
            <section className="min-h-[86vh] grid place-content-center">
                <Outlet />
            </section>
        </>

    )
}

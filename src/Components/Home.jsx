import { Outlet } from "react-router-dom"
import { Header } from "./UI/Layout/Post/Header"
import { Footer } from "./UI/Layout/Post/Footer"

export const Home = () => {
    return (
        <>
            <Header />

            <>
                <Outlet />
            </>

            <Footer />
        </>
    )
}

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../Components/Home"
import { Login } from "../Components/Users/Login"
import { Register } from "../Components/Users/Register"
import { HomeUser } from "../Components/Users/HomeUser"
import { AuthProvider } from "../Context/AuthProvider"
import { Dashboard } from "../Components/DashBoard/Dashboard"
import { HomeDashboard } from "../Components/Dashboard/HomeDashboard"
import { Profile } from "../Components/Users/Profile"
import { NotFound } from "../Components/NotFound"
import { HomePrivate } from "../Components/Private/HomePrivate"
import { Index } from "../Components/Post/Index"
import { Logout } from "../Components/Users/Logout"
import PrivateRoute from "./PrivateRoutes"

export const Routing = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route index element={<Index />} />
                        <Route path="/blog" element={<PrivateRoute> <HomePrivate /> </PrivateRoute>}>
                            <Route path="perfil" element={<Profile />} />
                        </Route>
                    </Route>

                    <Route path="/user" element={<HomeUser />}>
                        <Route index element={<Login />} />
                        <Route path="registro" element={<Register />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>

                    <Route path="/dashboard" element={<HomeDashboard />}>
                        <Route index element={<Dashboard />} />
                    </Route>

                    <Route path='*' element={<NotFound />} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

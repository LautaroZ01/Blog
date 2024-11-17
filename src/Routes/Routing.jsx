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
import { Logout } from "../Components/Users/Logout"
import PrivateRoute from "./PrivateRoutes"
import { Index } from "../Components/Home/Index"
import { IndexPost } from "../Components/Post/IndexPost"
import AuthorRoute from "./AuthorRoutes"
import { IndexAuthor } from "../Components/Post/Author/IndexAuthor"
import { Create } from "../Components/Post/Author/Create"
import { Users } from "../Components/Dashboard/Tables/Users"
import { AdminRoutes } from "./AdminRoutes"
import { Categories } from "../Components/Dashboard/Tables/Categories"
import { Roles } from "../Components/Dashboard/Tables/Roles"
import { Edit } from "../Components/Post/Author/Edit"
import { Posts } from "../Components/Dashboard/Tables/Posts"
import { View } from "../Components/Post/Author/View"

export const Routing = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route index element={<Index />} />
                        <Route path="/post" element={<IndexPost />} />
                        <Route path="/post/:id" element={<IndexPost />} />
                        <Route path="/escritor/perfil/:id" element={<View />} />

                        <Route path="/escritor" element={<AuthorRoute><IndexAuthor /></AuthorRoute>}>
                            <Route path="crear" element={<Create />} />
                            <Route path="editar/:id" element={<Edit />} />
                        </Route>

                        <Route path="/blog" element={<PrivateRoute> <HomePrivate /> </PrivateRoute>}>
                            <Route path="perfil" element={<Profile />} />
                        </Route>
                    </Route>

                    <Route path="/user" element={<HomeUser />}>
                        <Route index element={<Login />} />
                        <Route path="registro" element={<Register />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>

                    <Route path="/dashboard" element={<PrivateRoute> <HomeDashboard /> </PrivateRoute>}>
                        <Route index element={<Dashboard />} />
                        <Route path="users" element={<AdminRoutes ><Users /></AdminRoutes>} />
                        <Route path="categories" element={<AdminRoutes ><Categories /></AdminRoutes>} />
                        <Route path="roles" element={<AdminRoutes ><Roles /></AdminRoutes>} />
                        <Route path="posts" element={<AuthorRoute ><Posts /></AuthorRoute>} />
                    </Route>

                    <Route path='*' element={<NotFound />} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

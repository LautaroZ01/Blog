import useAuth from "../../../../Hooks/useAuth"

export const NavBar = () => {
    const {auth} = useAuth();
    return (
        <nav className="p-1 px-4 border-b border-text-200 flex items-center justify-between shadow-md">
            <h2 className="font-bold text-lg">Panel de control</h2>
            <div className="flex items-center gap-4 p-2">
                <a href="#logout" className="hover:underline">{auth && auth.username}</a>
            </div>
        </nav>
    )
}

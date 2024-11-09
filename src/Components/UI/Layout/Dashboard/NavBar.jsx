
export const NavBar = () => {
    return (
        <nav className="p-1 px-4 border-b border-text-200 flex items-center justify-between shadow-md">
            <h2 className="font-bold text-lg">Blog</h2>
            <div className="flex items-center gap-4 p-2">
                <a href="#profile" className="hover:underline">Perfil</a>
                <a href="#logout" className="hover:underline">Logout</a>
            </div>
        </nav>
    )
}

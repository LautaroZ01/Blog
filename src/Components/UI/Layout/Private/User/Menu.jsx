import { Link } from "react-router-dom"
import { MdLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

export const Menu = ({ user = {}, onMouseLeave = null }) => {
    const style = 'px-4 py-2 text-sm text-text-600 hover:bg-bg-200 flex items-center gap-2'
    
    return (
        <div
            onMouseLeave={onMouseLeave}
            onClick={onMouseLeave}
            className="menu-nav absolute right-0 top-10 z-50 w-56 mt-2 origin-top-right bg-bg-100 rounded-md shadow-lg opacity-0 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
        >
            <div className="py-1" role="none">
                <Link to='/blog/perfil' className={`${style}`}>
                    {user.photo !== 'https://user.svg' ? (
                        <img src={user.photo} alt={user.username} className="w-6 h-6 rounded-full" />
                    ) : (
                        <FaUserAlt className="w-6 h-6 rounded-full" />
                    )}
                    <div className="flex flex-col">
                        <span className="font-bold">
                            {user.username}
                        </span>
                        <span>
                            {user.email}
                        </span>
                    </div>
                </Link>
                <Link to='/user/logout'
                    href="#logout"
                    className={`${style} border-t border-bg-200 z-50`}
                    role="menuitem"
                >
                    <MdLogout />
                    Cerrar sesión
                </Link>
            </div>
        </div>
    )
}

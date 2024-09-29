import { Link } from "react-router-dom"
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useEffect } from "react";

export const Menu = ({onMouseLeave = null}) => {
    const style = 'px-4 py-2 text-sm text-gray-700 hover:bg-bg-300 flex items-center gap-2'

    return (
        <div
            onMouseLeave={onMouseLeave}
            onClick={onMouseLeave}
            className="menu-nav absolute right-0 top-10 z-10 w-56 mt-2 origin-top-right bg-bg-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
        >
            <div className="py-1" role="none">
                <Link to='/blog/perfil'
                    href="#profile"
                    className={style}
                    role="menuitem"
                >
                    <FaUserCog />
                    Perfil
                </Link>
                <Link to='/user/logout'
                    href="#logout"
                    className={style}
                    role="menuitem"
                >
                    <MdLogout />
                    Cerrar sesión
                </Link>
            </div>
        </div>
    )
}

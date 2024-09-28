import { Link } from "react-router-dom"
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const Menu = () => {
    const style = 'flex gap-2 items-center justify-start p-2'

    return (
        <div className="absolute w-44 top-10 right-0 bg-primary-200 p-4 rounded-md shadow-lg flex flex-col gap-2">
            <Link to='/blog/perfil' className='flex gap-2 items-center justify-start border-b border-bg-200 p-2'>
                <CgProfile />
                Ver perfil
            </Link>
            <Link to='/user/logout' className={style}>
                <MdLogout />
                Cerrar sesion
            </Link>
        </div>
    )
}

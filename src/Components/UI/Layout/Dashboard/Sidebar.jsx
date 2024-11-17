import { useState } from 'react';
import { FaBars, FaHome, FaUser, FaSignOutAlt, FaUsers, FaRegListAlt, FaArrowCircleLeft  } from 'react-icons/fa';
import { RiArticleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const { auth } = useAuth();

    return (
        <aside className={`h-screen ${isOpen ? 'w-64' : 'w-14'} border-r border-text-100 transition-width duration-300 flex flex-col items-center p-2`}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 border-b border-bg-200 border-l-4 border-l-transparent flex items-center gap-2 w-full">
                <FaBars className='my-1 text-primary-500' />
                {isOpen && <span href="#home" className='font-bold'>Blog</span>}

            </button>
            <nav className="flex-1 mt-4 w-full flex flex-col">
                <ul className="flex-1 space-y-2">
                    <li className="">
                        <Link to={'/dashboard'} className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                            <FaHome className='text-primary-500' />
                            {isOpen && <span href="#home">Home</span>}
                        </Link>
                    </li>
                    {auth && auth.rol == 'Administrador' &&
                        <>
                            <li className="">
                                <Link to={'/dashboard/users'} className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                                    <FaUsers className='text-primary-500' />
                                    {isOpen && <span href="#home">Lista de usuarios</span>}
                                </Link>
                            </li>
                            <li className="">
                                <Link to={'/dashboard/categories'} className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                                    <FaRegListAlt className='text-primary-500' />
                                    {isOpen && <span href="#home">Lista de categorias</span>}
                                </Link>
                            </li>
                            <li className="">
                                <Link to={'/dashboard/roles'} className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                                    <FaRegListAlt className='text-primary-500' />
                                    {isOpen && <span href="#home">Lista de roles</span>}
                                </Link>
                            </li>
                        </>
                    }
                    {auth && auth.rol != 'Usuario' &&
                        <>
                            <li className="">
                                <Link to={'/dashboard/posts'} className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                                    <RiArticleFill className='text-primary-500' />
                                    {isOpen && <span href="#home">Lista de articulos</span>}
                                </Link>
                            </li>
                        </>
                    }
                </ul>

                <ul className="space-y-2">
                    <li className="">
                        <Link to='/blog/perfil' className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                            <FaUser className='text-primary-500' />
                            {isOpen && <span href="#settings">Perfil</span>}
                        </Link>
                    </li>
                    <li className="">
                        <Link to={'/'} className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                            <FaArrowCircleLeft   className='text-primary-500' />
                            {isOpen && <span href="#settings">Volver al sitio</span>}
                        </Link>
                    </li>

                    <li className="border-t border-bg-200">
                        <Link to='/user/logout' className='flex gap-2 items-center p-2 border-l-4 border-transparent rounded-md hover:border-primary-500 hover:bg-text-100 transition-all duration-300'>
                            <FaSignOutAlt className='text-primary-500' />
                            {isOpen && <span href="#logout">Cerrar sesion</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;

import { useEffect, useState } from "react";
import { Global } from "../../../Helpers/Global";
import { Avatar } from "../../UI/Layout/User/Avatar";
import dayjs from "dayjs";
import { FiEdit } from "react-icons/fi";
import { EditRol } from "../../UI/Layout/Dashboard/Users/EditRol";
import { Pagination } from "../../UI/Utils/Pagination";

export const Users = () => {
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await fetch(Global.url + 'user', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        if (data.status === 'success') {
            const usersWithEditFlag = data.users.map(user => ({ ...user, isEditing: false }));
            setUsers(usersWithEditFlag);
        }
    };

    const calculateAge = (birthdate) => {
        return dayjs().diff(birthdate, 'year');
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'Administrador':
                return 'bg-primary-100 text-primary-900';
            case 'Usuario':
                return 'bg-bg-200 text-bg-900';
            case 'Escritor':
                return 'bg-blue-100 text-blue-900';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const toggleEdit = (userId) => {
        setUsers(users.map(user =>
            user.id === userId ? { ...user, isEditing: !user.isEditing } : user
        ));
    };


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(users.length / postsPerPage);

    return (
        <section className="flex flex-col p-2">
            <h1 className="font-bold text-xl py-4">Lista de Usuarios</h1>
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-text-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Nombre</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Pais</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Edad</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Rol</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs text-gray-500 uppercase font-bold">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 && currentUsers.map(user => (
                                    <tr className="odd:bg-white even:bg-text-100 hover:bg-text-100" key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-4">
                                            <Avatar photo={user.photo} alt={user.username} size={'8'} />
                                            <div>
                                                <p>{user.username} {user.surname}</p>
                                                <span className="text-text-400">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{user.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{calculateAge(user.birthdate)} años</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 min-w-32">
                                            {user.isEditing ? (
                                                <EditRol id={user.id} toggleEdit={toggleEdit} getUsers={getUsers} />
                                            ) : (
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.rol)}`}>
                                                    {user.rol}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                            <button onClick={() => toggleEdit(user.id)} className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md">
                                                <FiEdit />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </section>
    );
};

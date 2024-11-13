import { useEffect, useState } from "react"
import { Global } from "../../../Helpers/Global"
import { FiEdit } from "react-icons/fi";
import { LuListPlus } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import { CreatePopUp } from "../../UI/Layout/Dashboard/Roles/CreatePopUp";
import { EditPopUp } from "../../UI/Layout/Dashboard/Roles/EditPopUp";
import { DeletePopUp } from "../../UI/Layout/Dashboard/Roles/DeletePopUp";

export const Roles = () => {
    const [roles, setRoles] = useState([])

    const [selectedRol, setSelectedRol] = useState(null);

    const [showNewRol, setShowNewRol] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        getRoles()
    }, [])

    const getRoles = async () => {
        const response = await fetch(Global.url + 'rol', {
            method: 'GET',
            credentials: 'include'
        })

        const data = await response.json()

        if (data.status == 'success') {
            setRoles(data.roles)
        }
    }

    const handleNewRol = () => {
        setShowNewRol(true);
    }
    const handleEdit = (rol) => {
        setSelectedRol(rol);
        setShowEdit(true)
    }

    const handleDelete = (rol) => {
        setSelectedRol(rol);
        setShowDelete(true)
    }

    const closePopUp = () => {
        setSelectedRol(null);
        setShowNewRol(false)
        setShowEdit(false)
        setShowDelete(false)
    }

    return (
        <section>
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <button
                        onClick={handleNewRol}
                        className="bg-primary-100 text-primary-900 flex items-center gap-2 p-2 mb-4 rounded-md hover:bg-primary-200 transition-colors duration-[.25s]"
                    >
                        <LuListPlus />
                        Nuevo Rol
                    </button>
                    <div className="overflow-hidden rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-text-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">#</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Nombre</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Descripción</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs text-gray-500 uppercase font-bold">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.length > 0 && roles.map((rol) => (
                                    <tr className="odd:bg-white even:bg-text-100 hover:bg-text-100" key={rol.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{rol.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{rol.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{rol.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex items-center justify-end gap-2">
                                            <button
                                                className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md"
                                                onClick={() => handleEdit(rol)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md"
                                                onClick={() => handleDelete(rol)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showNewRol && (
                <CreatePopUp
                    onClose={closePopUp}
                    getRoles={getRoles}
                />
            )}

            {showEdit && selectedRol && (
                <EditPopUp
                    rol={selectedRol}
                    onClose={closePopUp}
                    getRoles={getRoles}
                />
            )}

            {showDelete && selectedRol && (
                <DeletePopUp
                    rol={selectedRol}
                    onClose={closePopUp}
                    getRoles={getRoles}
                />
            )}
        </section>
    )
}

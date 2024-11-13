import { FiEdit } from "react-icons/fi"
import { Link } from "react-router-dom"
import useAuth from "../../../../../Hooks/useAuth"

export const BtnEdit = ({ id }) => {
    const { auth } = useAuth()
    return (
        auth && auth.rol !== 'Usuario' && (
            <Link to={'/escritor/editar/' + id} className="absolute top-2 right-2 text-primary-900 hidden group-hover:block p-2 bg-primary-100 rounded-md z-50">
                <FiEdit />
            </Link>
        )
    )
}

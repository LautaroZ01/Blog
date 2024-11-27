import { FiEdit } from "react-icons/fi"
import { Link } from "react-router-dom"
import useAuth from "../../../../../Hooks/useAuth"
import PropTypes from "prop-types";


export const BtnEdit = ({ id, name }) => {
    const { auth } = useAuth()
    return (
        auth && auth.rol === 'Escritor' && name === auth.username && (
            <Link to={'/escritor/editar/' + id} className="absolute top-2 right-2 text-primary-900 hidden group-hover:block p-2 bg-primary-100 rounded-md z-50">
                <FiEdit />
            </Link>
        )
    )
}

BtnEdit.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

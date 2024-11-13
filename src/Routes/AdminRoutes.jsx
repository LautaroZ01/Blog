import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';


export const AdminRoutes = ({ children }) => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Cargando...</p>
    } else {
        return !auth || auth.rol != 'Administrador' ? <Navigate to="/" /> : children;
    }
}

AdminRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};


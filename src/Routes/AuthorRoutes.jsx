import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import PropTypes from 'prop-types';

const AuthorRoute = ({ children }) => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Cargando...</p>
    } else {
        return !auth || auth.rol == 'Usuario' ? <Navigate to="/" /> : children;
    }

};

AuthorRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthorRoute;

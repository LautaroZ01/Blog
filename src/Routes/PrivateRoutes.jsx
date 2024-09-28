import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Cargando...</p>
    } else {
        return !auth ? <Navigate to="/user" /> : children;
    }

};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;

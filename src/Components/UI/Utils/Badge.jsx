import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const Badge = ({ children, path = '/', isButton = true, type = 1, onClick = null, extraClass = '', isBig = true }) => {
    // Clases base comunes para ambos (Link o Button)
    const baseClasses = 'border flex items-center gap-2 p-1 px-2 rounded-md font-bold transition-all duration-[.25s]';

    // Estilos por tipo
    const types = {
        1: 'border-primary-200 bg-primary-100 text-primary-900 hover:bg-primary-200',
        2: 'border-accent-200 bg-accent-100 text-accent-900 hover:bg-accent-200'
    };

    // Estilos adicionales si el componente es un link activo
    const bigClass = !isBig ? 'text-xs' : '';

    // Clases combinadas
    const combinedClasses = `${baseClasses} ${types[type]} ${bigClass} ${extraClass}`;

    return isButton ? (
        <button
            onClick={onClick}
            className={combinedClasses}>
            {children}
        </button>
    ) : (
        <Link
            to={path}
            className={combinedClasses}>
            {children}
        </Link>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string,
    isButton: PropTypes.bool,
    type: PropTypes.number,
    onClick: PropTypes.func,
    extraClass: PropTypes.string,
    isBig: PropTypes.bool
};
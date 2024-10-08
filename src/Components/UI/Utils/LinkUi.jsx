import { Link } from "react-router-dom";
import PropTypes from 'prop-types';



export const LinkUi = ({ children, path = '/', active = false }) => {
    const baseClasses = "p-2 px-4 text-center w-full transition-all duration-250 border-b hover:rounded-md";
    const inactiveClasses = "border-bg-200 hover:border-b-transparent hover:bg-bg-200 hover:text-black";
    const activeClasses = "rounded-md border-b-transparent bg-bg-200 text-black hover:border-bg-200 hover:text-white hover:rounded-none hover:bg-transparent";

    return (
        <Link
            to={path}
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
            {children}
        </Link>
    );
};

LinkUi.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string,
    active: PropTypes.bool
}


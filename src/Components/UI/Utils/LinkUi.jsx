import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const LinkUi = ({ children, path = '/', active = false }) => {
    return (
        <>
            {!active ? (
                <Link to={path} className="p-2 px-4 text-center py-2 w-full transition-all duration-[.25s] border-b border-bg-200 hover:rounded-md hover:border-b-transparent hover:bg-bg-200 hover:text-black">
                    {children}
                </Link>

            ) : (
                <Link to={path} className="p-2 px-4 text-center py-2 w-full transition-all duration-[.25s] border-b rounded-md border-b-transparent bg-bg-200 text-black hover:border-b-bg-200 hover:text-white hover:rounded-none hover:bg-transparent">
                    {children}
                </Link>
            )
            }
        </>
    )
}
LinkUi.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string,
    active: PropTypes.bool
}

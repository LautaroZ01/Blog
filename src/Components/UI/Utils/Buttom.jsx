import { Link } from "react-router-dom"
import PropTypes from 'prop-types';


export const Buttom = ({ children, path = '/', isButton = true, type = 1, onClick=null, extraClass= ''}) => {
    const types = {
        1: 'border-transparent bg-bg-200 text-black hover:bg-transparent hover:border-bg-200 hover:text-white text-sm',
        2: 'border-bg-200 text-white hover:border-transparent hover:bg-bg-200 hover:text-black text-sm',
        3: 'border-transparent text-white hover:bg-bg-200 hover:text-black text-sm'
    }

    return (
        <>
            {isButton ? (
                <button onClick={onClick} className={`p-2 px-4 menu-nav flex items-center justify-center gap-2 shadow-md rounded-md transition-all duration-[.25s] border ${types[type]} ${extraClass}`}>{children}</button>
            ) : (
                <Link to={path} className={`p-2 px-4 text-sm shadow-md rounded-md transition-all duration-[.25s] border ${types[type]}`}>{children}</Link>
            )
            }
        </>
    )
}


Buttom.propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string,
    isButton: PropTypes.bool,
    type: PropTypes.number,
    onClick: PropTypes.func
};
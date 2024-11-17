import PropTypes from "prop-types";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const TypeSocial = ({ type }) => {
    return (
        < >
            {type && type === 'Facebook' && <FaFacebook className="w-9 h-9 p-2 bg-accent-100 text-accent-900 rounded-full" />}
            {type && type === 'Instagram' && <FaInstagram className="w-9 h-9 p-2 bg-accent-100 text-accent-900 rounded-full" />}
            {type && type === 'X' && <FaXTwitter className="w-9 h-9 p-2 bg-accent-100 text-accent-900 rounded-full" />}
        </>
    )
}

TypeSocial.propTypes = {
    type: PropTypes.string
};

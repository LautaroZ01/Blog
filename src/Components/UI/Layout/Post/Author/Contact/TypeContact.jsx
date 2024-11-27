import PropTypes from "prop-types";
import { BiLogoGmail, BiLogoWhatsapp } from "react-icons/bi";

export const TypeContact = ({ type }) => {
    return (
        < >
            {type && type === 'Gmail' && <BiLogoGmail className="w-9 h-9 bg-accent-100 rounded-full p-2 text-accent-900" />}
            {type && type === 'WhatsApp' && <BiLogoWhatsapp className="w-9 h-9 bg-accent-100 rounded-full p-2 text-accent-900" />}
        </>
    )
}

TypeContact.propTypes = {
    type: PropTypes.string
};
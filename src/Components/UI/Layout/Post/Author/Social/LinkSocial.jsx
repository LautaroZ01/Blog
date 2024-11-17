import PropTypes from "prop-types";
import { TypeSocial } from "./TypeSocial";

export const LinkSocial = ({ social, type = 1 }) => {
    return (
        <a href={social.link} target='_blank' 
        className= "flex items-center p-1 gap-2 rounded-md group border border-transparent hover:border-accent-100 transition-colors duration-[.25s]">
            <TypeSocial type={social.type} />
            <span className={type === 1 ? 'block group-hover:text-accent-900' : 'hidden'}>{social.name}</span>
        </a>
    )
}

LinkSocial.propTypes = {
    social: PropTypes.object.isRequired,
    type: PropTypes.number
};

import { FaUserAlt } from "react-icons/fa"
import PropTypes from "prop-types";

export const Avatar = ({ photo = '', alt = '', size = '4' }) => {
    const sizes = {
        '4': 'w-4 h-4',
        '6': 'w-6 h-6',
        '8': 'w-8 h-8',
        '16': 'w-16 h-16',
        '24': 'w-24 h-24',
        // Agrega otros tamaños según tus necesidades
    }

    const className = `${sizes[size] || 'w-4 h-4'} rounded-full aspect-square object-cover`


    return (
        <>
            {photo && photo !== 'https://user.svg' ? (
                <img src={photo} alt={alt} className={className} />
            ) : (
                <FaUserAlt className={className} />
            )}
        </>
    )
}

Avatar.propTypes = {
    photo: PropTypes.string,
    alt: PropTypes.string,
    size: PropTypes.string
};
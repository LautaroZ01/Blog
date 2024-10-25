import { FaUserAlt } from "react-icons/fa"
import PropTypes from "prop-types";

export const Avatar = ({ photo = '', alt = '', size = '4' }) => {
    const className = `w-${size} h-${size} rounded-full aspect-square`

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
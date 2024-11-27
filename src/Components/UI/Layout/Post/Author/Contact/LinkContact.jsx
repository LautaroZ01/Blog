import PropTypes from "prop-types";
import { TypeContact } from "./TypeContact";
import { useState } from "react";


export const LinkContact = ({ contact, type = 1 }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(contact.description)
            .then(() => {
                setIsCopied(true); // Activar animación
                setTimeout(() => setIsCopied(false), 2000); // Reiniciar estado después de 2 segundos
            })
            .catch(err => {
                console.error("Error copying to clipboard: ", err);
            });
    };

    return (
        <button
            className="flex items-center gap-4 relative hover:shadow-md transition-shadow duration-[.25s] rounded-md p-2"
            onClick={copyToClipboard}
        >
            <TypeContact type={contact.type} />
            <div className={type === 1 ? 'flex flex-col items-start' : 'hidden'}>
                <strong >{contact.name}</strong>
                <span className="text-text-500" >{contact.description}</span>
            </div>

            {isCopied && (
                <span
                    className="absolute top-0 right-0 mt-[-10px] mr-[-10px] bg-primary-100 text-primary-900 text-xs px-2 py-1 rounded shadow-md animate-bounce"
                >
                    Copiado!
                </span>
            )}
        </button>
    )
}

LinkContact.propTypes = {
    contact: PropTypes.object.isRequired,
    type: PropTypes.number
};
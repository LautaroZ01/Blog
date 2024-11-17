import PropTypes from "prop-types";
import { useState } from "react";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { LinkContact } from "./LinkContact";
import { AddContact } from "./Pop Up/AddContact";
import { EditContact } from "./Pop Up/EditContact";
import { DeleteContact } from "./Pop Up/DeleteContact";

export const ContactA = ({ contacts, id, getAuthor }) => {
    const [selectedContact, setSelectedContact] = useState(null)

    const [newContact, setNewContact] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [deleteContact, setDeleteContact] = useState(false)

    const handleNewSocial = () => {
        setNewContact(true);
    }

    const handleEditSocial = (contact) => {
        setSelectedContact(contact)
        setEditContact(true);
    }

    const handleDeleteSocial = (contact) => {
        setSelectedContact(contact)
        setDeleteContact(true);
    }

    const closePopUp = () => {
        setNewContact(false);
        setEditContact(false);
        setDeleteContact(false)
    }

    return (
        <section className="rounded-lg p-4 bg-white">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Tus contactos</h3>
                <button
                    className="flex items-center gap-2 p-2 bg-primary-100 text-primary-900 rounded-md shadow-md border border-transparent hover:bg-transparent hover:border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                    onClick={handleNewSocial}
                >
                    <strong>Agregar</strong>
                    <IoAddCircle />
                </button>
            </div>

            {contacts.length > 0 ? (
                contacts.map((contact) => (
                    <article
                        key={contact.id}
                        className="flex items-center justify-between p-2 rounded-lg mb-4 shadow-sm transition hover:shadow-md"
                    >
                        <LinkContact contact={contact} />

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEditSocial(contact)}
                                className="p-2 bg-primary-100 text-primary-900 rounded-lg hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-700 transition"
                            >
                                <MdModeEdit />
                            </button>

                            <button
                                onClick={() => handleDeleteSocial(contact)}
                                className="p-2 bg-red-100 text-red-900 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </article>
                ))
            ) : (
                <p className="text-gray-600 text-center">No tienes contactos configurados.</p>
            )}

            {/* Modales */}
            {newContact && (
                <AddContact id={id} getAuthor={getAuthor} onClose={closePopUp} />
            )}
            {editContact && selectedContact && (
                <EditContact contact={selectedContact} onClose={closePopUp} getAuthor={getAuthor} />
            )}
            {deleteContact && selectedContact && (
                <DeleteContact contact={selectedContact} onClose={closePopUp} getAuthor={getAuthor} />
            )}
        </section>
    )
}

ContactA.propTypes = {
    contacts: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    getAuthor: PropTypes.func.isRequired
};

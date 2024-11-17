import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Global } from "../../../../../Helpers/Global";
import { FormAuthor } from "./FormAuthor";
import { BtnEdit } from "../../User/BtnEdit";
import { Social } from "../../Post/Author/Social/Social";
import { ContactA } from "../../Post/Author/Contact/ContactA";

export const InfoAuthor = ({ id_author }) => {
    const [author, setAuthor] = useState({});
    const [socials, setSociala] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getAuthor()
    }, [])

    const getAuthor = async () => {
        const response = await fetch(Global.url + 'author/' + id_author);

        const data = await response.json()

        if (data.status === "success") {
            setAuthor(data.author)
            setSociala(data.socialMedials)
            setContacts(data.contacts)
        }
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    return (
        <section className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
            <div className="flex flex-wrap-reverse md:flex-wrap items-start justify-center">
                <div className="md:flex-1">
                    <h2 className="text-xl font-bold p-4">Tu informacion de escritor</h2>
                    {author &&
                        <FormAuthor author={author} isEdit={isEdit} setIsEdit={toggleEdit} getAuthor={getAuthor} />
                    }
                </div>
                <BtnEdit onClick={toggleEdit} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {author?.id && (
                    <>
                        <Social socials={socials} id={author.id} getAuthor={getAuthor} />
                        <ContactA contacts={contacts} id={author.id} getAuthor={getAuthor} />
                    </>
                )}
            </div>
        </section>
    )
}

InfoAuthor.propTypes = {
    id_author: PropTypes.number.isRequired
};

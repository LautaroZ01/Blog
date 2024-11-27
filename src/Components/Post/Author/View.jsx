import { useParams } from "react-router-dom";
import { Global } from "../../../Helpers/Global";
import { useEffect, useState } from "react";

import { MdOutlinePinDrop } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa";

import dayjs from "dayjs";
import { LinkContact } from "../../UI/Layout/Post/Author/Contact/LinkContact";
import { LinkSocial } from "../../UI/Layout/Post/Author/Social/LinkSocial";
import { Button } from "../../UI/Utils/Button";
import { ArrowBack } from "../../UI/Utils/ArrowBack";

export const View = () => {
    const { id } = useParams();

    const [author, setAuthor] = useState(null);
    const [contacts, setContacts] = useState(null);
    const [socials, setSocials] = useState(null);

    useEffect(() => {
        getAuthor();
    }, []);

    const getAuthor = async () => {
        const response = await fetch(Global.url + "author/" + id, {
            method: "GET",
        });

        const data = await response.json();

        if (data.status === "success") {
            setAuthor(data.author);
            setContacts(data.contacts);
            setSocials(data.socialMedials);
        }
    };

    return (
        author && (
            <main className="bg-bg-100 flex flex-col min-h-screen">
                <div className="bg-gradient-to-r from-primary-500 to-primary-300 w-full h-60"></div>

                <section className="grid md:grid-cols-2 w-full md:max-w-[80%] mx-auto p-2">
                    <div className="flex flex-col gap-6 items-center md:items-start">
                        <div className="relative -mt-20 w-40 h-40 rounded-full overflow-hidden border-4 bg-white border-bg-100 shadow-md">
                            {author.photo && author.photo !== 'https://user.svg' ? <img
                                src={author.photo}
                                alt={`${author.username}'s profile`}
                                className="w-full h-full object-cover"
                            />
                                : <FaUserAstronaut className="w-full h-full object-cover" />}
                        </div>
                        <div className="">
                            <div className="flex items-center gap-4">
                                <ArrowBack />
                                <h1 className="text-2xl font-extrabold text-accent-500">{author.username} {author.surname}</h1>
                            </div>

                            <div className="text-text-600 mt-4">
                                <p>{dayjs().diff(author.birthdate, 'year')} Años</p>
                                <div className="flex items-center gap-2 mt-4">
                                    <MdOutlinePinDrop className="w-6 h-6 text-primary-500" />
                                    <span className="capitalize">
                                        {author.address === 'argentina' ? `Cachi, Salta, ${author.address}` : author.address}
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div className="flex items-start mt-12">
                            <Button path="/post" >Ver articulos</Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-extrabold text-accent-500">Mi Bios</h3>
                            <p className="text-base text-text-600 text-balance p-2">{author.bio}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end text-text-600 p-4 gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-lg">Escritor</span>
                            <FaBookBookmark className="w-6 h-6 text-primary-500" />
                        </div>
                        <span className="px-4 py-1 rounded-full bg-primary-100 text-primary-900 text-lg">{author.description}</span>

                        {contacts.length > 0 ? (
                            <article
                                className="flex flex-col gap-2 p-2"
                            >
                                {contacts.map((contact) => (
                                    <LinkContact contact={contact} key={contact.id} />
                                ))}
                            </article>
                        ) : (
                            <p className="text-gray-600 text-center">No tiene contactos.</p>
                        )}

                        {socials.length > 0 ? (
                            <article
                                className="flex flex-col md:flex-row items-center gap-10"
                            >
                                {socials.map((social) => (
                                    <LinkSocial social={social} key={social.id} />
                                ))}
                            </article>
                        ) : (
                            <p className="text-gray-600 text-center">No tienes redes sociales configuradas.</p>
                        )}
                    </div>
                </section>
            </main>
        )
    );
};

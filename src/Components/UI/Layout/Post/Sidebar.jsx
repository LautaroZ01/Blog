import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Global } from "../../../../Helpers/Global";
import PropTypes from "prop-types";
import { LinkSocial } from "./Author/Social/LinkSocial";

export const Sidebar = ({ search = {}, searcher = null, searcherId = null, id_author = null }) => {
    const [categories, setCategories] = useState([]);
    const [socials, setSocials] = useState([])

    useEffect(() => {
        getAllCategories();

        if (id_author) {
            getSocial();

        }
    }, [id_author]);


    const getAllCategories = async () => {
        const res = await fetch(Global.url + 'post/categories', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();

        if (data.status === 'success') {
            setCategories(data.categories);
        }
    };

    const getSocial = async () => {

        const res = await fetch(Global.url + 'author/social/' + id_author, {
            method: 'GET'
        })

        const data = await res.json()

        if (data.status === 'success') {
            setSocials(data.socialMedials)
        }
    }


    return (
        <aside className="flex flex-col gap-4 p-4 sticky top-44 ">
            <div>
                <form onSubmit={searcherId} className="flex flex-row-reverse shadow-inner gap-2 items-center p-2 border border-text-300 rounded-md bg-text-100">
                    <input
                        type="text"
                        value={search.title}
                        onChange={searcher}
                        className="w-full outline-none bg-inherit"
                        placeholder="Busca por titulos o categorias..."
                    />
                    <button type="submit">
                        <FaSearch className="text-text-300" />
                    </button>
                </form>
            </div>
            <div className="border-b border-b-text-300">
                <h3 className="text-lg font-bold text-accent-500">Categorías</h3>
                <form className="p-2">
                    {categories && categories.map(category => (
                        <div key={category.id} className="flex items-center gap-2">
                            <input
                                name={category.name}
                                id={category.name}
                                value={search.category}
                                onChange={searcher}
                                type="checkbox"
                            />
                            <label htmlFor={category.name}>{category.name}</label>
                        </div>
                    ))}
                </form>
            </div>
            {socials.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-accent-500">Mis Redes sociales</h3>
                    <div className="flex gap-4 p-2">
                        {socials.map((social) => (
                            <LinkSocial social={social} type={2} key={social.id} />
                        ))}
                    </div>
                </div>
            )}

        </aside>
    );
};

Sidebar.propTypes = {
    search: PropTypes.object.isRequired,
    searcher: PropTypes.func,
    searcherId: PropTypes.func,
    id_author: PropTypes.number
};
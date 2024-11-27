import { useNavigate, useParams } from "react-router-dom"
import { Sidebar } from "../UI/Layout/Post/Sidebar"
import fondo from '/Fondos/Fondopost.png'
import { useEffect, useState } from "react"
import { Post } from "./Post"
import { List } from "./List"
import { Global } from "../../Helpers/Global"

export const IndexPost = () => {
    const [imgFondo, setImgFondo] = useState({
        fondo,
        alt: 'Blog'
    })

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState({
        title: '',
        category: []
    });

    const [idAuthor, setIdAuthor] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            getPosts();
            setImgFondo({ fondo, alt: 'Blog' })
        }
    }, [id, search])


    const getPosts = async () => {
        const request = await fetch(Global.url + 'post', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await request.json();

        if (data.status == 'success') {
            setPosts(data.posts)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const searcher = (e) => {

        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setSearch((prevSearch) => ({
                ...prevSearch,
                category: checked ? [...prevSearch.category, name] : prevSearch.category.filter(cat => cat !== name)
            }));
        } else {
            setSearch((prevSearch) => ({
                ...prevSearch,
                title: value
            }));
        }
    };

    const searcherId = (e) => {
        e.preventDefault();
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setSearch((prevSearch) => ({
                ...prevSearch,
                category: checked ? [...prevSearch.category, name] : prevSearch.category.filter(cat => cat !== name)
            }));
        } else {
            setSearch((prevSearch) => ({
                ...prevSearch,
                title: value || ''
            }));
        }

        if (id) {
            navigate('/post');
        }
    };

    let filterPosts = [];

    if (!search.title && search.category.length === 0) {
        filterPosts = posts;
    } else {
        filterPosts = posts.filter((dato) => {

            const matchesTitle = dato.title.toLowerCase().includes(search.title.toLowerCase());

            const matchesCategory = search.category.length === 0 || search.category.includes(dato.category);

            return matchesTitle && matchesCategory;
        });
    }

    return (
        <section className="bg-bg-100">
            <div className="w-full max-h-96 relative">
                {!id &&
                    <div className="absolute w-full h-full bg-bg-300/30 z-[2px]"></div>
                }
                <img
                    src={imgFondo.fondo}
                    alt={imgFondo.alt}
                    className={id ? 'w-full max-h-96 object-cover z-[1px]' : 'w-full max-h-96 object-contain z-[1px]'}
                />
            </div>
            <div className="md:max-w-[80%] mx-auto z-40 -translate-y-24 flex flex-wrap-reverse gap-2 p-2 md:p-0">
                <section className='flex flex-col flex-[0_0_100%] lg:flex-[0_0_75%] bg-white p-2 rounded-md min-h-[800px]'>
                    {id ? <Post setImagePost={setImgFondo} setIdAuthor={setIdAuthor} /> :
                        !loading ? <List posts={filterPosts} /> : <h1>Cargando...</h1>
                    }
                </section>
                <section className="flex-[0_0_100%] lg:flex-[0_0_24%] bg-white rounded-md border border-text-100">
                    {id ?
                        <Sidebar search={search} searcher={searcher} searcherId={searcherId} id_author={idAuthor !== null ? idAuthor : undefined} /> :
                        !loading ?
                            <Sidebar search={search} searcher={searcher} searcherId={searcherId} /> : <h1>Cargando...</h1>
                    }
                </section>


            </div>
        </section>
    )
}

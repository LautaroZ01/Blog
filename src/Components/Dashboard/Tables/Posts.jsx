import { useEffect, useState } from "react";
import { RiArticleFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import { Global } from "../../../Helpers/Global";
import { formatearFecha } from "../../../Helpers/DateParth";
import { Status } from "../../UI/Layout/Dashboard/Posts/Status";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { DeletePopUp } from "../../UI/Layout/Dashboard/Posts/DeletePopUp";
import { RiAiGenerate } from "react-icons/ri";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Pagination } from "../../UI/Utils/Pagination";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt, FaEye } from "react-icons/fa";
import { PostPDF } from "../PDF/PostPDF";

export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { auth } = useAuth();
    const [selectedPost, setSelectedPost] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        let url = Global.url + 'post/private';
        if (auth.rol === 'Administrador') {
            url = url + '?status=all';
        } else {
            url = url + '?status=escritor&id=' + auth.id;
        }

        try {
            const request = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await request.json();
            if (data.status === 'success') {
                setPosts(data.posts);
            }
        } catch (error) {
            console.log('Algo salió mal', error);
        }
    };

    const handleDelete = (post) => {
        setSelectedPost(post);
        setShowDelete(true);
    };

    const closePopUp = () => {
        setShowDelete(false);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <section className="p-2">
            <h1 className="font-bold text-xl py-4">Lista de Articulos</h1>
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="flex items-start">
                        {auth && auth.rol === 'Escritor' && (
                            <Link
                                to={'/escritor/crear'}
                                className="bg-primary-100 text-primary-900 flex items-center gap-2 p-2 mb-4 rounded-md hover:bg-primary-200 transition-colors duration-[.25s]"
                            >
                                <RiArticleFill />
                                Nuevo Articulo
                            </Link>
                        )}
                    </div>
                    <div className="overflow-hidden rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-text-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">#</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Titulo</th>
                                    {auth && auth.rol == 'Administrador' &&
                                        <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Autor</th>
                                    }
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Categoria</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Estado</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 uppercase font-bold">Comentarios y Likes</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs text-gray-500 uppercase font-bold">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.length > 0 && currentPosts.map((post) => (
                                    <tr className="odd:bg-white even:bg-text-100 hover:bg-text-100" key={post.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{post.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize flex flex-col">
                                            <Link to={'/post/' + post.id}>
                                                {post.title}
                                            </Link>
                                            <span className="text-text-400 text-sm">{formatearFecha(post.created_at)}</span>
                                        </td>
                                        {auth && auth.rol == 'Administrador' &&
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{post.author} {post.surname}</td>
                                        }
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">{post.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize"><Status state={post.state} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                                            <div className="flex items-center justify-around">
                                                <div className="flex items-center gap-2">
                                                    <FaCommentAlt className="text-text-400" />
                                                    {post.comment_count}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <AiFillLike className="text-text-400" />
                                                    {post.like_count}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex items-center justify-end gap-2">
                                            {post.state !== 'Deshabilitado' && (
                                                <Link
                                                    to={'/post/' + post.id}
                                                    className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md"
                                                >
                                                    <FaEye />
                                                </Link>
                                            )}
                                            <Link
                                                to={'/escritor/editar/' + post.id}
                                                className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md"
                                            >
                                                <FiEdit />
                                            </Link>
                                            <PDFDownloadLink
                                                document={<PostPDF post={post} />}
                                                fileName={`post-${post?.title}.pdf`}
                                            >
                                                {({ loading }) =>
                                                    loading ? (
                                                        <button>Loading Document ...</button>
                                                    ) : (
                                                        <button title="Generar PDF" className="text-primary-900 inline-flex p-2 bg-primary-100 rounded-md">
                                                            <RiAiGenerate />
                                                        </button>
                                                    )
                                                }
                                            </PDFDownloadLink>
                                            <button
                                                onClick={() => handleDelete(post)}
                                                className="text-red-900 inline-flex p-2 bg-red-100 rounded-md"
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>

            {showDelete && selectedPost && (
                <DeletePopUp
                    post={selectedPost}
                    onClose={closePopUp}
                    getPosts={getPosts}
                />
            )}
        </section>
    );
};

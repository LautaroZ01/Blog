import { useEffect, useState } from "react";
import { Avatar } from "../../User/Avatar";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SlOptionsVertical } from "react-icons/sl";
import useAuth from "../../../../../Hooks/useAuth";
import { MenuComent } from "./MenuComent";
import { useForm } from "../../../../../Hooks/useForm";
import { Button } from "../../../Utils/Button";
import { Global } from "../../../../../Helpers/Global";
import PropTypes from "prop-types";

dayjs.extend(relativeTime);

export const Comment = ({ comment, onDelete }) => {
    const [commentState, setCommentState] = useState(comment)
    const { auth } = useAuth();
    const { form, changed } = useForm({ content: "" });

    // Estado para controlar la visibilidad del menú
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        setCommentState(comment)
    }, [comment])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        setIsMenuOpen(!isMenuOpen);
    };

    const setStatusComment = () => {
        setCommentState(prevState => ({
            ...prevState,
            status: prevState.status === 'H' ? 'D' : 'H'
        }));
    }

    const editComment = async (e) => {
        e.preventDefault();

        if (!form.content.trim()) return;

        const commentData = { ...form, id_comment: commentState.id };

        const response = await fetch(Global.url + 'comment/', {
            method: 'PATCH',
            body: JSON.stringify(commentData),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            comment.content = data.comment.content;
            toggleForm();
        }
    };

    return (
        comment.status === 'H' ? (
            <article className={`p-4 flex items-start gap-2 ${commentState.status == 'H' ? 'bg-white' : 'bg-text-100'} rounded-md `}>
                <Avatar photo={commentState.photo} alt={commentState.username} size={'8'} />
                <div className="flex flex-col gap-2 flex-1 px-2">
                    <div className="flex items-center justify-between">
                        <strong>{commentState.username}</strong>
                        <div className="flex gap-2 items-center">
                            <small className="block text-sm text-gray-400">{dayjs(commentState.create_at).fromNow()}</small>
                            {auth && (auth.id === commentState.id_user || auth.rol == 'Administrador') && (
                                <div className="relative">
                                    <button
                                        onClick={toggleMenu}
                                        className="bg-primary-100 text-primary-900 rounded-full p-2 flex items-center justify-center"
                                    >
                                        <SlOptionsVertical className="w-3 h-3" />
                                    </button>

                                    {isMenuOpen && <MenuComent toggleForm={toggleForm} id={commentState.id} onDelete={onDelete} idUser={commentState.id_user} status={commentState.status} setStatusComment={setStatusComment} />}
                                </div>
                            )}
                        </div>
                    </div>
                    {isFormOpen ? (
                        <form onSubmit={editComment} className="item-animation flex items-center gap-2">
                            <input
                                type="text"
                                onChange={changed}
                                name="content"
                                defaultValue={commentState.content}
                                placeholder="Escribe aquí tu comentario"
                                className="w-full bg-text-100 border-none outline-none shadow-inner p-2 rounded-md max-w-[75ch]" />
                            <Button isButton={true}>Editar</Button>
                        </form>
                    ) : (
                        <p className="item-animation p-text text-base text-balance text-text-500 leading-relaxed">{commentState.content}</p>
                    )}
                </div>
            </article>
        ) : auth && auth.rol == 'Administrador' && (
            <article className={`p-4 flex items-start gap-2 ${commentState.status == 'H' ? 'bg-white' : 'bg-text-100'} rounded-md `}>
                <Avatar photo={commentState.photo} alt={commentState.username} size={'8'} />
                <div className="flex flex-col gap-2 flex-1 px-2">
                    <div className="flex items-center justify-between">
                        <strong>{commentState.username}</strong>
                        <div className="flex gap-2 items-center">
                            <small className="block text-sm text-gray-400">{dayjs(commentState.create_at).fromNow()}</small>
                            {auth && (auth.id === commentState.id_user || auth.rol == 'Administrador') && (
                                <div className="relative">
                                    <button
                                        onClick={toggleMenu}
                                        className="bg-primary-100 text-primary-900 rounded-full p-2 flex items-center justify-center"
                                    >
                                        <SlOptionsVertical className="w-3 h-3" />
                                    </button>

                                    {isMenuOpen && <MenuComent toggleForm={toggleForm} id={commentState.id} onDelete={onDelete} idUser={commentState.id_user} status={commentState.status} setStatusComment={setStatusComment} />}
                                </div>
                            )}
                        </div>
                    </div>
                    {isFormOpen ? (
                        <form onSubmit={editComment} className="item-animation flex items-center gap-2">
                            <input
                                type="text"
                                onChange={changed}
                                name="content"
                                defaultValue={commentState.content}
                                placeholder="Escribe aquí tu comentario"
                                className="w-full bg-text-100 border-none outline-none shadow-inner p-2 rounded-md max-w-[75ch]" />
                            <Button isButton={true}>Editar</Button>
                        </form>
                    ) : (
                        <p className="item-animation p-text text-base text-balance text-text-500 leading-relaxed">{commentState.content}</p>
                    )}
                </div>
            </article>
        )
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onDelete: PropTypes.func
};



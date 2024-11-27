import { Link } from "react-router-dom";
import useAuth from "../../../../../Hooks/useAuth";
import { Avatar } from "../../User/Avatar";
import { FaComments } from "react-icons/fa";
import { Button } from "../../../Utils/Button";
import { Global } from "../../../../../Helpers/Global";
import { useForm } from "../../../../../Hooks/useForm";
import PropTypes from "prop-types";

export const CommentForm = ({ idPost, setList }) => {
    const { auth } = useAuth();
    const { form, changed, setForm } = useForm({ content: "" });

    const createComment = async (e) => {
        e.preventDefault();

        if (!form.content.trim()) return;

        const commentData = { ...form, id_post: idPost };

        const response = await fetch(Global.url + 'comment/', {
            method: 'POST',
            body: JSON.stringify(commentData),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            setList((prevList) => [data.comment, ...prevList]);
            setForm({ content: "" });
        }
    };

    return (
        auth ? (
            <form className="p-4 flex flex-col gap-2 bg-white shadow-md rounded-md" onSubmit={createComment}>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar photo={auth.photo} alt={auth.username} size={'8'} />
                        <div className="flex flex-col text-sm">
                            <strong>{auth.username} {auth.surname}</strong>
                            <span className="text-text-400">{auth.email}</span>
                        </div>
                    </div>
                    <FaComments className="size-6 text-primary-500" />
                </div>
                <textarea
                    onChange={changed}
                    name="content"
                    placeholder="Escribe aquí tu comentario"
                    value={form.content}
                    className="w-full bg-text-100 border-none outline-none min-h-20 shadow-inner p-2 rounded-md"
                />
                <div className="flex justify-end w-full border-t py-2">
                    <Button isButton={true}>Comentar</Button>
                </div>
            </form>
        ) : (
            <Link to='/user' className="w-full flex bg-primary-100 text-primary-900 p-4 rounded-md items-center justify-center">
                <p className="font-bold">Debes iniciar sesión para poder comentar</p>
            </Link>
        )
    );
};

CommentForm.propTypes = {
    idPost: PropTypes.number.isRequired,
    setList: PropTypes.func
};
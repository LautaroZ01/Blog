import { useEffect, useState } from "react";
import { CommentForm } from "../../UI/Layout/Post/Comment/CommentForm";
import { CommentList } from "../../UI/Layout/Post/Comment/CommentList";
import { Global } from "../../../Helpers/Global";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";

export const List = ({ idPost }) => {
    const { auth } = useAuth()
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleComments, setVisibleComments] = useState(10); // Cantidad de comentarios visibles inicialmente

    useEffect(() => {
        getComments();
    }, [idPost]);

    const getComments = async () => {
        setLoading(true);

        try {
            let url
            let response
            if (auth && auth.rol === 'Administrador') {
                url = Global.url + 'comment/private/' + idPost
                response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            } else {
                url = Global.url + 'comment/' + idPost
                response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            }

            const data = await response.json();

            if (data.status === 'success') {
                setList(data.comments);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreComments = () => {
        setVisibleComments((prevVisibleComments) => prevVisibleComments + 10); // Incrementa en 10
    };

    return (
        <section className="flex flex-col gap-2 bg-bg-100 p-2 rounded-md">
            <h3 className="h-text text-xl font-bold">Comentarios</h3>
            <CommentForm idPost={idPost} setList={setList} />
            <CommentList
                loading={loading}
                list={list.slice(0, visibleComments)} // Muestra solo los comentarios visibles
                setList={setList}
            />
            {!loading && visibleComments < list.length && (
                <button onClick={loadMoreComments} className="text-accent-500">
                    Ver más
                </button>
            )}
        </section>
    );
};

List.propTypes = {
    idPost: PropTypes.number
};

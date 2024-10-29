import { useEffect, useState } from "react";
import { CommentForm } from "../../UI/Layout/Post/Comment/CommentForm";
import { CommentList } from "../../UI/Layout/Post/Comment/CommentList";
import { Global } from "../../../Helpers/Global";
import PropTypes from "prop-types";

export const List = ({ idPost }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getComments();
    }, [idPost]);

    const getComments = async () => {
        setLoading(true);
        try {
            const response = await fetch(Global.url + 'comment/' + idPost, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });

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

    return (
        <section className="flex flex-col gap-2 bg-bg-100 p-2 rounded-md">
            <h3 className="h-text text-xl font-bold">Comentarios</h3>
            <CommentForm idPost={idPost} setList={setList} />
            <CommentList loading={loading} list={list} setList={setList} />
        </section>
    );
};

List.propTypes = {
    idPost: PropTypes.number
};
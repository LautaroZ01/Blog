import { Comment } from "./Comment";
import PropTypes from "prop-types";

export const CommentList = ({ loading, list, setList }) => {
    if (loading) {
        return <p>Cargando comentarios...</p>;
    }

    if (list.length === 0) {
        return <p>No hay comentarios</p>;
    }

    const handleDelete = (id) => {
        setList((prevList) => prevList.filter(comment => comment.id !== id));
    };

    return (
        <section className="flex flex-col gap-4 mt-4 ">
            {list.map(comment => (
                <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
            ))}
        </section>
    );
};

CommentList.propTypes = {
    list: PropTypes.array,
    loading: PropTypes.bool,
    setList: PropTypes.func
  };
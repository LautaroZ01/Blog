import { Link } from "react-router-dom";
import { ArrowBack } from "../UI/Utils/ArrowBack";
import { Badge } from "../UI/Utils/Badge";
import { formatearFecha } from "../../Helpers/DateParth";
import { Button } from "../UI/Utils/Button";
import PropTypes from "prop-types";

import parse from 'html-react-parser';


export const List = ({ posts = [] }) => {

    return (
        <section>
            <div className="flex items-center p-2">
                <ArrowBack />
                <h1 className="h-text text-3xl font-extrabold flex-1 text-center">Mis articulos</h1>
            </div>
            <section className="grid md:grid-cols-2 grid-flow-row gap-4 p-2">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post.id} className="flex flex-col gap-2 shadow-md rounded-md">
                            <Link to={'/post/' + post.id}>
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="w-full object-cover object-top shadow-md rounded aspect-video"
                                />
                            </Link>
                            <div className="flex items-center p-2 justify-between">
                                <Badge isBig={false}>{post.category}</Badge>
                                <small className="text-text-400">{formatearFecha(post.created_at)}</small>
                            </div>
                            <div className="p-2 flex flex-col gap-2 flex-1" >
                                <Link to={'/post/' + post.id} className="hover:text-text-500 transition-colors duration-[.25s]" >
                                    <h3 className="h-text text-lg font-extrabold">{post.title}</h3>
                                </Link>
                                <div className="p-text text-base text-balance line-clamp-3 text-text-500">
                                    {parse(post.content)}
                                </div>
                            </div>
                            <div className="flex justify-end p-2">
                                <Button path={'/post/' + post.id}>
                                    Leer más
                                </Button>
                            </div>
                        </article>
                    ))
                ) : (
                    <p>No hay posts disponibles.</p>
                )}
            </section>
        </section>
    )
}

List.propTypes = {
    posts: PropTypes.array,
};

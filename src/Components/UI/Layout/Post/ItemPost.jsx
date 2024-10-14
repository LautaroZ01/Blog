import { Link } from "react-router-dom";
import { Button } from "../../Utils/Button";
import { MiniAuthor } from "./MiniAuthor";
import { formatearFecha } from "../../../../Helpers/DateParth";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { Badge } from "../../Utils/Badge";

export const ItemPost = ({ post = {}, isRow = true }) => {
  const date = formatearFecha(post.created_at);

  if (isRow) {
    return (
      <article className="row-start-2 col-span-3 md:col-span-1 rounded-md flex flex-col overflow-hidden">
        <Link to={"/post/" + post.id} className="w-full flex-shrink-0">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Link>

        {/* Contenido del post */}
        <div className="flex flex-col gap-4 p-4 w-full">
          <div className="flex justify-between items-center">
            <Badge isBig={false}>{post.category}</Badge>
            <small className="text-primary-500">{date}</small>
          </div>

          {/* Título y descripción */}
          <div className="flex flex-col gap-2 flex-1">
            <Link to={"/post/" + post.id}>
              <h3 className="text-xl lg:text-2xl font-extrabold hover:text-text-500 transition-all duration-200">
                {post.title.toUpperCase()}
              </h3>
            </Link>

            {/* Estilo de párrafo mejorado */}
            <p className="text-base lg:text-lg leading-7 text-balance line-clamp-3">
              {post.content}
            </p>
          </div>

          {/* Interacciones (Likes y comentarios) */}
          <div className="flex gap-2 justify-between items-center py-4 border-t border-text-300">
            <div className="flex items-center gap-6 text-text-400">
              <article className="flex items-center gap-2">
                <AiFillLike />
                <p>{post.like_count}</p>
              </article>
              <article className="flex items-center gap-2">
                <FaCommentAlt />
                <p>{post.comment_count}</p>
              </article>
            </div>
            <Button path={"/post/" + post.id}>Leer más</Button>
          </div>
        </div>
      </article>
    );
  } else {
    return (
      <article className="col-span-3 lg:flex gap-2 lg:max-h-[550px] rounded-md shadow">
        <Link
          to={"/post/" + post.id}
          className="w-full lg:w-[45%] flex-shrink-0 relative"
        >
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
        </Link>
        <div className="w-full lg:w-[55%] flex flex-col justify-between p-4">
          <div className="mb-6 border-b border-text-500 py-3 flex items-center flex-wrap gap-4">
            <div className="flex-grow flex flex-col gap-2 items-start">
              <Badge isBig={false}>{post.category}</Badge>
              <Link to={"/post/" + post.id}>
                <h2 className="text-xl lg:text-2xl font-extrabold hover:text-text-500 transition-all duration-200">
                  {post.title.toUpperCase()}
                </h2>
              </Link>
            </div>

            <Link>
              <MiniAuthor
                name={post.author}
                photo={post.photo}
                description={post.description}
              />
            </Link>
          </div>

          <div className="flex-1 min-h-52">
            <p className="text-base text-balance  line-clamp-5">
              {post.content}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-6 text-text-400 mt-2 font-bold">
              <article className="flex items-center gap-2">
                <AiFillLike />
                <p>{post.like_count}</p>
              </article>
              <article className="flex items-center gap-2">
                <FaCommentAlt />
                <p>{post.comment_count}</p>
              </article>
            </div>

            <Button path={"/post/" + post.id}>Leer más</Button>
          </div>
        </div>
      </article>
    );
  }
};

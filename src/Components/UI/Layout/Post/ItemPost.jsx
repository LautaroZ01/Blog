import { Link } from "react-router-dom";
import { Button } from "../../Utils/Button";
import { MiniAuthor } from "./MiniAuthor";
import { formatearFecha } from "../../../../Helpers/DateParth";
import { FaCommentAlt } from "react-icons/fa";
import { Badge } from "../../Utils/Badge";
import { Like } from "../User/Like";

export const ItemPost = ({ post = {}, isRow = true }) => {
  const date = formatearFecha(post.created_at);

  if (isRow) {
    return (
      <article className="row-start-2 col-span-3 md:col-span-1 rounded-md shadow-sm flex flex-col overflow-hidden bg-white">
        <Link to={"/post/" + post.id} className="w-full flex-shrink-0">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover aspect-video"
            loading="lazy"
          />
        </Link>

        <div className="flex flex-col gap-4 p-4 w-full">
          <div className="flex justify-between items-center">
            <Badge isBig={false}>{post.category}</Badge>
            <small className="text-primary-500">{date}</small>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <Link to={"/post/" + post.id}>
              <h3 className="h-text text-xl lg:text-2xl font-extrabold hover:text-text-500 transition-all duration-200">
                {post.title.toUpperCase()}
              </h3>
            </Link>

            <p className="p-text text-base text-balance line-clamp-3 text-text-500">
              {post.content}
            </p>
          </div>

          <div className="flex gap-2 justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-6 ">

              <Like likeCount={post.like_count} id_post={post.id} />
              <Link className="flex items-center gap-2">
                <FaCommentAlt className="text-text-400" />
                <strong>{post.comment_count}</strong>
              </Link>

            </div>
            <Button path={"/post/" + post.id}>Leer más</Button>
          </div>
        </div>
      </article>
    );
  } else {
    return (
      <article className="col-span-3 lg:flex gap-2 lg:max-h-[550px] rounded-md shadow bg-white">
        <Link
          to={"/post/" + post.id}
          className="w-full lg:w-[45%] flex-shrink-0 relative"
        >
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover rounded-md aspect-square"
            loading="lazy"
          />
        </Link>
        <div className="w-full lg:w-[55%] flex flex-col justify-between p-4">
          <div className="mb-6 border-b border-text-500 py-3 flex items-center flex-wrap gap-4">
            <div className="flex-grow flex flex-col gap-2 items-start">
              <Badge isBig={false}>{post.category}</Badge>
              <Link to={"/post/" + post.id}>
                <h2 className="h-text text-xl lg:text-2xl font-extrabold hover:text-text-500 transition-all duration-200">
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
            <p className="p-text text-base text-balance line-clamp-5 text-text-500">
              {post.content}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-6 ">

              <Like likeCount={post.like_count} id_post={post.id} />
              <Link className="flex items-center gap-2">
                <FaCommentAlt className="text-text-400" />
                <strong>{post.comment_count}</strong>
              </Link>

            </div>

            <Button path={"/post/" + post.id}>Leer más</Button>
          </div>
        </div>
      </article>
    );
  }
};

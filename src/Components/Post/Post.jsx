import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Badge } from "../UI/Utils/Badge";
import { FaCommentAlt, FaUserAlt } from "react-icons/fa";
import { Like } from "../UI/Layout/User/Like";
import { formatearFecha } from "../../Helpers/DateParth";
import { LuDot } from "react-icons/lu";

import { Global } from "../../Helpers/Global";
import { useEffect, useState } from "react";
import { ArrowBack } from "../UI/Utils/ArrowBack";
import { Avatar } from "../UI/Layout/User/Avatar";
import { List } from "./Comments/List";

export const Post = ({ setImagePost = () => { } }) => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPost();
  }, []);

  const getPost = async () => {
    setLoading(true)

    const request = await fetch(Global.url + "post/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setPost(data.post);
      setImagePost({ fondo: data.post.image_url, alt: data.post.title });
      setLoading(false)
    } else {
      setLoading(false)
    }
  };

  const date = formatearFecha(post.created_at);

  return (
    !loading &&

    <section className="flex flex-col">
      <div>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 p-2">
            <ArrowBack />

            <Badge isBig={false}>{post.category || 'Sin categoría'}</Badge>
          </div>
          <div className="flex items-center gap-6 ">

            <Like likeCount={post.like_count} id_post={post.id} />
            <Link className="flex items-center gap-2">
              <FaCommentAlt className="text-text-400" />
              <strong>{post.comment_count}</strong>
            </Link>

          </div>

        </div>
        <div className="flex flex-col gap-2 p-2 items-center">
          <h1 className="h-text text-3xl font-extrabold">{post.title}</h1>
          <div className="flex gap-2 items-center">
            <small className="text-text-400">Creado el {date}</small>
            <LuDot className="text-text-400" />
            <Link className="flex items-center gap-2 group">
              <Avatar photo={post.photo} alt={post.author} size={'6'} />
              <small className="text-accent-400 group-hover:text-accent-600 transition-all duration-[.25s]">{post.author} {post.surname}</small>
            </Link>
          </div>
        </div>
      </div>

      <img
        src={post.image_url}
        alt={post.title}
        className="w-full h-full object-cover shadow-md rounded-md aspect-video"
      />

      <div className="max-w-[75ch] mx-auto py-6 p-2">
        <p className="p-text text-base text-balance text-text-500">{post.content}</p>
      </div>

      <List idPost={post.id} />
    </section>


  );
};

Post.propTypes = {
  setImagePost: PropTypes.func
};
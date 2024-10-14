import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../Helpers/Global";
import { Badge } from "../UI/Utils/Badge";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";

export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const request = await fetch(Global.url + "post/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setPost(data.post);
    }
  };

  return (
    <section className="">
      <div className="w-full max-h-56 relative">
        <div className="absolute w-full h-full bg-text-900/40 z-[2px]"></div>
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full max-h-56 object-cover z-[1px]"
        />
      </div>
      <div className="max-w-[80%] mx-auto z-40 -translate-y-10">
        <div className="flex flex-col max-w-[75%] bg-white p-2 rounded-md">
          <div>
            <div className="flex items-center justify-between p-2">
              <Badge isBig={false}>{post.category}</Badge>
              <div className="flex items-center gap-6 ">
                <Link className="flex items-center gap-2">
                  <AiFillLike className="text-text-400" />
                  <strong>{post.like_count}</strong>
                </Link>
                <Link className="flex items-center gap-2">
                  <FaCommentAlt className="text-text-400" />
                  <strong>{post.comment_count}</strong>
                </Link>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold p-4">{post.title}</h1>
          </div>
          <div className="">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full object-cover shadow-md rounded-md"
            />
          </div>
          <div className="max-w-[75ch] mx-auto p-2 py-6">
            <p className="text-base text-balance leading-7">{post.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

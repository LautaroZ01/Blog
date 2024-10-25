import { AiFillLike } from "react-icons/ai";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Global } from "../../../../Helpers/Global";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";

export const Like = ({ likeCount = 0, id_post = null }) => {
    const idPostInt = parseInt(id_post);

    const [active, setActive] = useState(false);
    const { auth } = useAuth();
    const [count, setCount] = useState(parseInt(likeCount));
    const [userAuth, setUserAuth] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false); // Estado para controlar la animación
    const [showNotification, setShowNotification] = useState(false); // Estado para controlar la notificación

    useEffect(() => {
        setCount(parseInt(likeCount));
        if (auth && id_post) {
            controllLike();
            setUserAuth(true);
        }
    }, [auth, id_post]);

    const controllLike = async () => {
        const request = await fetch(Global.url + 'like/' + idPostInt, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();

        if (data.status === 'success') {
            setActive(true);
        }
    };

    const like = async () => {
        const request = await fetch(Global.url + 'like', {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({ id_post: idPostInt }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status === 'success') {
            setActive(true);
            setCount(count + 1);
            triggerAnimation(); // Llama la animación
        }
    };

    const dislike = async () => {
        const request = await fetch(Global.url + 'like', {
            method: "DELETE",
            credentials: 'include',
            body: JSON.stringify({ id_post: idPostInt }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status === 'success') {
            setActive(false);
            setCount(count - 1);
            triggerAnimation(); // Llama la animación
        }
    };

    const triggerAnimation = () => {
        // Activa la animación
        setIsAnimating(true);
        // Después de 500ms (o el tiempo de tu animación), desactiva la animación
        setTimeout(() => {
            setIsAnimating(false);
        }, 500); // Ajusta la duración al tiempo de tu animación
    };

    const handleUnauthenticatedLike = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    return (
        <div className="relative">
            {userAuth ? (
                active ? (
                    <button onClick={dislike} className="flex items-center gap-2 group text-primary-500 hover:text-text-400 transition-all duration-[.25s]">
                        <AiFillLike className={` group-hover:text-text-400 text-primary-500 transition-all duration-[.25s] ${isAnimating ? 'like-animation' : ''}`} />
                        <strong className="text-primary-500 group-hover:text-black transition-all duration-[.25s]">{count}</strong>
                    </button>
                ) : (
                    <button onClick={like} className="flex items-center gap-2 group hover:text-primary-500 transition-all duration-[.25s]">
                        <AiFillLike className={`text-text-400 group-hover:text-primary-500 transition-all duration-[.25s] ${isAnimating ? 'like-animation' : ''}`} />
                        <strong className="group-hover:text-primary-500 transition-all duration-[.25s]">{count}</strong>
                    </button>
                )
            ) : (
                <button onClick={handleUnauthenticatedLike} className="flex items-center gap-2 group hover:text-primary-500 transition-all duration-[.25s]">
                    <AiFillLike className="text-text-400 group-hover:text-primary-500 transition-all duration-[.25s]" />
                    <strong className="group-hover:text-primary-500 transition-all duration-[.25s]">{count}</strong>
                </button>
            )}

            {showNotification && (
                <Link to='/user' className="absolute top-[20px] left-0 min-w-64 p-2 bg-red-100 text-red-900 text-center rounded-md backdrop-blur-md">
                    Inicia sesión para dar like.
                </Link>
            )}
        </div>
    );
};

Like.propTypes = {
    likeCount: PropTypes.string,
    id_post: PropTypes.number
};


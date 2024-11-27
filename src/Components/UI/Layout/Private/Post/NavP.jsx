import { useState } from "react";
import { Menu } from "../User/Menu";
import { Button } from "../../../Utils/Button";
import { FaUserAstronaut } from "react-icons/fa";
import useAuth from "../../../../../Hooks/useAuth";
import { MdOutlinePostAdd } from "react-icons/md";

import PropTypes from "prop-types";

export const NavP = ({ user = {} }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { auth } = useAuth();

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <nav>
            <ul className="flex flex-1 items-center justify-center gap-4 relative p-2">
                {auth && auth.rol == 'Escritor' &&
                    <li>
                        <Button path="/escritor/crear" type={2}>
                            <MdOutlinePostAdd className="w-5 h-6" />
                            Crear
                        </Button>
                    </li>
                }

                <li>
                    <Button isButton={true} onClick={toggleMenu}>
                        {user.photo && user.photo !== 'https://user.svg' ? (
                            <img src={user.photo} alt={user.username} className='w-6 h-6 rounded-full aspect-square object-cover' />
                        ) : (
                            <FaUserAstronaut className='w-6 h-6 rounded-full aspect-square' />
                        )}
                        <p className="capitalize">
                            {user.username}
                        </p>
                    </Button>
                </li>

                {isMenuVisible && (
                    <Menu user={user} onMouseLeave={toggleMenu} />
                )}
            </ul>
        </nav>
    );
};

NavP.propTypes = {
    user: PropTypes.object.isRequired
};

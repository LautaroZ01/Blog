import { useState } from "react";
import { Menu } from "../User/Menu";
import { Button } from "../../../Utils/Button";
import { Avatar } from "../../User/Avatar";
import { FaUserAlt } from "react-icons/fa";

export const NavP = ({ user = {} }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <nav>
            <ul className="flex flex-1 items-center justify-center gap-4 relative p-2">
                <li>
                    <Button isButton={true} onClick={toggleMenu}>
                        {user.photo && user.photo !== 'https://user.svg' ? (
                            <img src={user.photo} alt={user.username} className='w-6 h-6 rounded-full aspect-square' />
                        ) : (
                            <FaUserAlt className='w-6 h-6 rounded-full aspect-square' />
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

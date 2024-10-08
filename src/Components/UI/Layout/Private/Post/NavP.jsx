import { useState } from "react";
import { Menu } from "../User/Menu";
import { FaRegUser } from "react-icons/fa";
import { Button } from "../../../Utils/Button";

export const NavP = ({ user = {} }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <nav>
            <ul className="flex flex-1 items-center justify-center gap-3 relative">
                <li>
                    <Button isButton={true} onClick={toggleMenu}>
                        {user.photo !== 'https://user.svg' ? (
                            <img src={user.photo} alt={user.username} className="w-5 h-5 rounded-full" />
                        ) : (
                            <FaRegUser />
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

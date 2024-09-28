import { useState } from "react";
import { Menu } from "../User/Menu";
import { FaRegUser } from "react-icons/fa";
import { Buttom } from "../../../Utils/Buttom";

export const NavP = ({ user = {} }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <nav>
            <ul className="flex flex-1 items-center justify-center gap-3 relative">
                <li>
                    <Buttom onClick={toggleMenu}>
                        {user.photo !== 'https://user.svg' ? (
                            <img src={user.photo} alt={user.username} />
                        ) : (
                            <FaRegUser />
                        )}
                        <p className="capitalize">
                            {user.username}
                        </p>
                    </Buttom>
                </li>

                {isMenuVisible && <Menu />}
            </ul>
        </nav>
    );
};

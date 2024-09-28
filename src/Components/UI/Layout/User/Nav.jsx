import { IoIosArrowBack } from "react-icons/io";
import { Buttom } from "../../Utils/Buttom";

export const Nav = () => {
    return (
        <nav className="bg-primary-200 p-3 sticky top-0 text-white">
            <div className="md:max-w-[80%] mx-auto flex items-stretch md:justify-between">
                <Buttom isButton={false}>
                    <IoIosArrowBack />
                </Buttom>
            </div>
        </nav>
    )
}

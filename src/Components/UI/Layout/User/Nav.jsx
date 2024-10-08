import { IoIosArrowBack } from "react-icons/io";
import { Button } from "../../Utils/Button";

export const Nav = () => {
    return (
        <nav className="bg-primary-200 p-3 sticky top-0 text-white">
            <div className="md:max-w-[80%] mx-auto flex items-stretch md:justify-between">
                <Button path={'/'} active={true}>
                    <IoIosArrowBack />
                </Button>
            </div>
        </nav>
    )
}

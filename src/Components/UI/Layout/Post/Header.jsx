import useAuth from "../../../../Hooks/useAuth"
import { LinkUi } from "../../Utils/LinkUi"
import { NavP } from "../Private/Post/NavP";
import { Nav } from "./Nav"


export const Header = () => {
    const { auth, loading } = useAuth();

    if (!loading) {
        return (
            <header className="bg-primary-200 p-3 sticky top-0 text-white z-10">
                <div className="max-w-[80%] mx-auto flex items-center justify-between text-sm">
                    <strong className="text-sm">
                        <LinkUi active={true}>AZ</LinkUi>
                    </strong>

                    {!auth ? <Nav /> : <NavP user={auth} />}

                </div>
            </header>
        )
    }
}

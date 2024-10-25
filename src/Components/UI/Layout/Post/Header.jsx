import useAuth from "../../../../Hooks/useAuth"
import { Button } from "../../Utils/Button";
import { NavP } from "../Private/Post/NavP";
import { Nav } from "./Nav"


export const Header = () => {
    const { auth, loading } = useAuth();

    if (!loading) {
        return (
            <header className="bg-bg-100 sticky top-0 z-50">
                <div className="max-w-[80%] mx-auto flex items-center justify-between text-sm">
                    <strong className="text-sm">
                        <Button active={true}>AZ</Button>
                    </strong>

                    {!auth ? <Nav /> : <NavP user={auth} />}

                </div>
            </header>
        )
    }
}

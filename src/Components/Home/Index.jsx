import { Contact } from "./Contact"
import { Posts } from "./Posts"
import { Welcome } from "./Welcome"

export const Index = () => {
    return (
        <>
            <Welcome />
            <Posts />
            <Contact />
        </>
    )
}

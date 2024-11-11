import { useEffect, useState } from "react"
import { Container } from "../UI/Utils/Container"
import { Global } from "../../Helpers/Global";
import { addError } from "../../Helpers/Errors";
import { ItemPost } from "../UI/Layout/Post/ItemPost";

export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        try {
            const request = await fetch(Global.url + 'post?limit=3', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await request.json()

            if (data.status == 'success') {
                setPosts(data.posts)
            } else {
                setError(addError(data.error))
            }

        } catch (error) {
            setError(addError('Algo salio mal'))
            console.log('Algo salio mal', error)
        }
    }

    return (
        <Container>
            <section className="max-w-[80%] m-auto py-10 md:px-2">
                <h1 className="text-2xl font-bold text-accent-500">Algunos de mis articulos</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4 py-4 items-start">
                    {error.length > 0 ? (
                        <div className="col-span-2">No hay artículos disponibles</div>
                    ) : (
                        posts && posts.map((post, index) => (

                            <ItemPost key={post.id} post={post} isRow={index === 0 ? false : true} />
                        ))
                    )}
                </div>
            </section>
        </Container>
    )
}

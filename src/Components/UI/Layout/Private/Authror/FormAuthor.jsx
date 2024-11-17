import { Global } from "../../../../../Helpers/Global";
import { useForm } from "../../../../../Hooks/useForm"
import PropTypes from "prop-types";


export const FormAuthor = ({ author, isEdit, setIsEdit, getAuthor }) => {
    const { form, changed } = useForm()

    const editedAuthor = async (e) => {
        e.preventDefault()

        const response = await fetch(Global.url + 'author', {
            method: 'PATCH',
            body: JSON.stringify(form),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        if(data.status === 'success'){
            setIsEdit()
            getAuthor()
        }
    }

    return (
        <form className="flex flex-col gap-4 p-4 max-w-[800px]" onSubmit={editedAuthor}>
            <div className="flex flex-col gap-2">
                <strong className="text-gray-400">
                    Descripcion
                </strong>
                {isEdit ?
                    <input onChange={changed} name="description" placeholder="Describete en dos o tres palabras" className="bg-transparent p-2 rounded-md focus:outline-gray-300" type="text" defaultValue={author.description} />
                    :
                    <p className="bg-transparent p-2 rounded-md">
                        {author.description}
                    </p>
                }
            </div>

            <div className="flex flex-col gap-2">
                <strong className="text-gray-400">
                    Bio
                </strong>
                {isEdit ?
                    <textarea name="bio" id="bio"
                        cols="30"
                        rows="10"
                        className="bg-transparent p-2 rounded-md focus:outline-gray-300"
                        placeholder="Escribe sobre ti"
                        onChange={changed}
                        defaultValue={author.bio}
                    >

                    </textarea>
                    :
                    <p className="bg-transparent p-2 rounded-md">
                        {author.bio}
                    </p>
                }
            </div>

            {isEdit &&
                <button
                    className={`col-span-2 p-2 px-4 menu-nav flex items-center justify-center gap-2 shadow-md rounded-md transition-all duration-[.25s] border bg-primary-500 text-white hover:bg-transparent hover:border-primary-200 hover:text-black`}
                >
                    Guardar cambios
                </button>
            }

        </form>
    )
}

FormAuthor.propTypes = {
    author: PropTypes.object.isRequired,
    isEdit: PropTypes.bool.isRequired,
    setIsEdit: PropTypes.func.isRequired,
    getAuthor: PropTypes.func.isRequired,
};


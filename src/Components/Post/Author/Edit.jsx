import { useCallback, useEffect, useState } from 'react';
import { Category } from '../../UI/Layout/Post/Author/Category';
import { useForm } from '../../../Hooks/useForm';
import { UploadFile } from './UploadFile';
import { useDropzone } from 'react-dropzone';
import { States } from '../../UI/Layout/Post/Author/States';
import { Global } from '../../../Helpers/Global';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from '../../UI/Utils/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '../../UI/Utils/ArrowBack';

export const Edit = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({})

    const { id } = useParams()
    const { form, changed } = useForm();

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);

    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        setLoading(true);
        const response = await fetch(Global.url + 'post/' + id, {
            method: 'GET'
        })

        const data = await response.json()

        if (data.status == 'success') {
            setPost(data.post)
            setValue(data.post.content)
            setLoading(false)
        }
    }

    const onDropImage1 = useCallback(acceptedFiles => {
        setImage1(acceptedFiles[0]);
    }, []);

    const onDropImage2 = useCallback(acceptedFiles => {
        setImage2(acceptedFiles[0]);
    }, []);

    const { getRootProps: getRootProps1, getInputProps: getInputProps1, isDragActive: isDragActive1 } = useDropzone({ onDrop: onDropImage1 });
    const { getRootProps: getRootProps2, getInputProps: getInputProps2, isDragActive: isDragActive2 } = useDropzone({ onDrop: onDropImage2 });

    const editPost = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!value.trim()) {
            setError('El contenido es requerido.');
            setLoading(false);
            return;
        }

        setError('');
        if (value) {
            form.content = value;
        }

        if (form.id_state) {
            form.id_state = parseInt(form.id_state);
        }

        if (form.id_category) {
            form.id_category = parseInt(form.id_category);
        }

        const request = await fetch(Global.url + "post/" + post.id, {
            method: "PATCH",
            body: JSON.stringify(form),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();

        if (data.status === 'success') {
            setTimeout(async () => {
                if (image1) {
                    await uploadFile(image1, post.images[1].id);
                }
                if (image2) {
                    await uploadFile(image2, post.images[0].id);
                }
                setPost(data.post)
                setLoading(false);
                navigate("/dashboard/posts");
            }, 3000);
        } else {
            setError('Algo salio mal.');
            setLoading(false);
            return;
        }
    };

    const uploadFile = async (file, id) => {
        if (file) {
            const formData = new FormData();
            formData.append("photo", file);

            const uploadRequest = await fetch(Global.url + "post/upload/" + id, {
                method: "PATCH",
                body: formData,
                credentials: "include",
            });

            const data = await uploadRequest.json();

            if (data.status === "success") {
                setLoading(false);
                console.log('Archivo subido con éxito');
            } else {
                setLoading(false);
                console.log("Error al subir el archivo");
            }
        }
    };

    return (
        <div className='bg-bg-100'>
            {loading ? <h1>Cargando...</h1> :
                <form onSubmit={editPost}>
                    <div className='w-full max-h-96'>
                        <UploadFile
                            key="uploadFile1"
                            getInputProps={getInputProps1}
                            getRootProps={getRootProps1}
                            isDragActive={isDragActive1}
                            file={image1}
                            url={post.images && post.images[1].url}
                            extraClass={'max-h-96'}
                        />
                    </div>

                    <section className='md:max-w-[80%] mx-auto z-40 -translate-y-24 bg-transparent grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen'>
                        <div className='md:col-span-3 flex flex-col gap-4 bg-white p-2 rounded-md min-h-full order-2 md:order-1'>
                            <div className="w-full">
                                <div className='flex gap-4 items-center mb-2 p-2'>
                                    <ArrowBack />
                                    <label htmlFor="title" className="text-lg font-semibold text-accent-500 ">
                                        Título del artículo
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    onChange={changed}
                                    defaultValue={post.title}
                                    required
                                    placeholder="Escribe el título aquí"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div className=''>
                                <UploadFile
                                    key="uploadFile2"
                                    getInputProps={getInputProps2}
                                    getRootProps={getRootProps2}
                                    isDragActive={isDragActive2}
                                    file={image2}
                                    url={post.images && post.images[0].url}
                                    extraClass={'aspect-video'}
                                />
                            </div>

                            <div className='mx-auto'>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </div>

                            <div className="w-full h-full min-h-64 p-text text-text-500" required>
                                <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                    className="mx-auto h-[80%] bg-white rounded-md w-full max-w-[75ch]"
                                />
                            </div>
                        </div>

                        <div className='order-1 md:order-2 md:col-start-4 flex flex-col gap-4 p-2 bg-white rounded-md'>
                            <h2 className='font-bold text-accent-500'>Caracteristicas </h2>
                            <Category changed={changed} name={post.category} />
                            <States changed={changed} name={post.state} />
                            <Button isButton={true}>Editar articulos</Button>
                        </div>
                    </section>
                </form>
            }
        </div>
    );
};

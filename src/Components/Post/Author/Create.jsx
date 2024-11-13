import { useCallback, useState } from 'react';
import { Category } from '../../UI/Layout/Post/Author/Category';
import { useForm } from '../../../Hooks/useForm';
import { UploadFile } from './UploadFile';
import { useDropzone } from 'react-dropzone';
import { States } from '../../UI/Layout/Post/Author/States';
import { Global } from '../../../Helpers/Global';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from '../../UI/Utils/Button';
import { ArrowBack } from '../../UI/Utils/ArrowBack';

export const Create = () => {
    const [value, setValue] = useState('');
    const { form, changed } = useForm();
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onDropImage1 = useCallback(acceptedFiles => {
        setImage1(acceptedFiles[0]);
    }, []);

    const onDropImage2 = useCallback(acceptedFiles => {
        setImage2(acceptedFiles[0]);
    }, []);

    const { getRootProps: getRootProps1, getInputProps: getInputProps1, isDragActive: isDragActive1 } = useDropzone({ onDrop: onDropImage1 });
    const { getRootProps: getRootProps2, getInputProps: getInputProps2, isDragActive: isDragActive2 } = useDropzone({ onDrop: onDropImage2 });

    const createPost = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!value.trim()) {
            setError('El contenido es requerido.');
            setLoading(false);
            return;
        }

        setError('');
        form.content = value;
        form.id_state = parseInt(form.id_state);
        form.id_category = parseInt(form.id_category);

        const request = await fetch(Global.url + "post", {
            method: "POST",
            body: JSON.stringify(form),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();

        if (data.status === 'success') {
            setTimeout(async () => {
                await uploadFile(image2, 1, data.post.id);
                await uploadFile(image1, 2, data.post.id);
                console.log("El post se creo");
                setLoading(false);
            }, 3000);
        } else {
            setError('Algo salio mal.');
            setLoading(false);
            return;
        }
    };

    const uploadFile = async (file, type, idPost) => {
        if (file) {
            const formData = new FormData();
            formData.append("photo", file);

            const uploadRequest = await fetch(Global.url + "post/upload/" + idPost + '/' + type, {
                method: "POST",
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
                <form onSubmit={createPost}>
                    <div className='w-full max-h-96'>
                        <UploadFile
                            key="uploadFile1"
                            getInputProps={getInputProps1}
                            getRootProps={getRootProps1}
                            isDragActive={isDragActive1}
                            file={image1}
                            extraClass={'max-h-96'}
                        />
                    </div>

                    <section className='md:max-w-[80%] mx-auto z-40 -translate-y-24 bg-transparent grid grid-cols-4 gap-4 min-h-screen'>
                        <div className='col-span-3 flex flex-col gap-4 bg-white p-2 rounded-md min-h-full'>
                            <div className="w-full">
                                <div className='flex gap-4 mb-2 items-center p-2'>
                                    <ArrowBack />
                                    <label htmlFor="title" className="block text-lg font-semibold text-accent-500">
                                        Título del artículo
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    onChange={changed}
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

                        <div className='col-start-4 flex flex-col gap-4 p-2 bg-white rounded-md'>
                            <h2 className='font-bold text-accent-500'>Caracteristicas </h2>
                            <Category changed={changed} />
                            <States changed={changed} />
                            <Button isButton={true}>Crear articulos</Button>
                        </div>
                    </section>
                </form>
            }
        </div>
    );
};

import { useState, useCallback } from "react";
import { Button } from "../../../Utils/Button";
import { Global } from "../../../../../Helpers/Global";
import useAuth from "../../../../../Hooks/useAuth";
import { useDropzone } from 'react-dropzone';
import upload from '/Fondos/Fondoperfil.png'

export const UploadAvatar = ({ setUser = null, toggleUploadPopup = null }) => {
    const { setAuth } = useAuth();
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Genera una URL para la previsualización
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

    const uploadFile = async (e) => {
        e.preventDefault();

        if (acceptedFiles[0]) {
            const formData = new FormData();
            formData.append("photo", acceptedFiles[0]);

            const uploadRequest = await fetch(Global.url + "user/upload", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await uploadRequest.json();

            if (data.status === "success") {
                setUser((prevAuth) => ({ ...prevAuth, photo: data.photo }));
                setAuth((prevAuth) => ({ ...prevAuth, photo: data.photo }));
                toggleUploadPopup();
            } else {
                console.log("Error al subir el archivo");
            }
        }
    };

    return (
        <form onSubmit={uploadFile} className="flex flex-col items-center space-y-4">
            <div className="w-full flex flex-col items-center space-y-2">
                <div
                    {...getRootProps()}
                    className={`w-full rounded-md cursor-pointer border-dashed border-primary-600 border-2 p-4 h-48 flex items-center justify-center bg-primary-100 text-primary-900 shadow-inner transition-all duration-200 ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
                >
                    <input {...getInputProps()} />
                    {preview ? (
                        <img src={preview} alt="preview" className="object-cover w-32 h-32 rounded-full" />
                    ) : (
                        <div className="flex flex-col items-center">
                            <img src={upload} alt="preview" className="w-32 h-32 mb-2 aspect-square object-cover" />
                            <p>Arrastra una imagen o haz clic para seleccionar</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full flex items-center justify-end space-x-3">
                <Button isButton={true} onClick={toggleUploadPopup} type={2} className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg px-4 py-2">Cancelar</Button>
                <Button isButton={true} className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-4 py-2">Enviar</Button>
            </div>
        </form>
    );
};

"use client";

import FileUploader from "@/components/file-uploader";
import { Loader } from "@/components/loader";
import { codeFlags } from "@/helpers/code-flags";
import { useForm } from "@/hooks/useForm";
import { supabase } from "@/utils/supabase/config";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

// Estado inicial del formulario
const initialForm = {
    nombres: "",
    apellidos: "",
    tipo_documento: "RUC",
    nro_documento: "",
    email: "",
    prefix_telefono: "1",
    nro_telefono: "",
};

export default function CreateProfilePage() {
    const [submitting, setSubmitting] = useState<boolean>(false); 
    const { formState, onInputChange } = useForm(initialForm);
    const [urls, setUrls] = useState<string[]>([]);

    const { nombres, apellidos, nro_documento, email, prefix_telefono, nro_telefono } = formState;

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validar que se haya subido al menos una imagen
        if(urls.length === 0) {
            toast.error("Debes subir al menos una imagen", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored"
            });
            return;
        }

        setSubmitting(true);
        
        try {
            // Insertar los datos del usuario en la tabla 'usuarios'
            const { error, data } = await supabase.from("usuarios").insert(formState).select();

            if(error) {
                toast.error(error.message);
                return;
            }

            const id = data[0].id;

            // Insertar las URLs de las imágenes en la tabla 'imagenes'
            await supabase.from("imagenes").insert(urls.map((url) => ({ url, user_id: id }))); 

            delete data[0].id;
            delete data[0].created_at;

            // Redireccionar al perfil del usuario
            setTimeout(() => {
                const query = new URLSearchParams({
                    ...data[0]
                }).toString();
                redirect(`/profile/${id}?${query}`);
            }, 3000);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    if(submitting) return <Loader />;

    return (
        <div className="max-w-5xl flex flex-col items-center mx-auto my-7">
            <h1 className="mb-7 text-3xl font-extrabold">TRD</h1>
            {/* Formulario de creación de perfil */}
            <form className="flex flex-col gap-5 md:w-[600px] w-[400px]" onSubmit={ handleSubmit } >
                <div className="flex flex-col gap-6 rounded-2xl py-6 px-4 bg-[#181A1F]">
                    <h3 className="text-xl text-[#9396A5]">Información personal</h3>
                    {/* Campo nombres */}
                    <div className="flex flex-col gap-1 rounded-xl bg-[#272A33] border border-[#272A33] p-3 w-full">
                        <label className="text-sm">Nombres</label>
                        <input 
                            type="text"
                            placeholder="Nombres" 
                            className="bg-transparent outline-none border-none"
                            name="nombres"
                            onChange={ onInputChange }
                            value={ nombres }
                            required
                        />
                    </div>
                    {/* Campo apellidos */}
                    <div className="flex flex-col gap-1 rounded-xl bg-[#272A33] border border-[#272A33] p-3 w-full">
                        <label className="text-sm">Apellidos</label>
                        <input 
                            type="text"
                            placeholder="Apellidos" 
                            className="bg-transparent outline-none border-none"
                            name="apellidos"
                            onChange={ onInputChange }
                            value={ apellidos }
                            required
                        />
                    </div>
                    {/* Campo tipo de documento */}
                    <div className="flex flex-col gap-1 rounded-xl bg-[#272A33] border border-[#272A33] p-3 w-full">
                        <label className="text-sm">Tipo de documento</label>
                        <select className="bg-transparent outline-none border-none" name="tipo_documento" onChange={ onInputChange } required>
                            <option value="RUC">RUC</option>
                            <option value="DNI">DNI</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                    </div>
                    {/* Campo número de documento */}
                    <div className="flex flex-col gap-1 rounded-xl bg-[#272A33] border border-[#272A33] p-3 w-full">
                        <label className="text-sm">Número de documento</label>
                        <input 
                            type="text"
                            placeholder="Número de documento" 
                            className="bg-transparent outline-none border-none"
                            name="nro_documento"
                            onChange={ onInputChange }
                            value={ nro_documento }
                            required
                        />
                    </div>
                    {/* Campo correo electrónico */}
                    <div className="flex flex-col gap-1 rounded-xl bg-[#272A33] border border-[#272A33] p-3 w-full">
                        <label className="text-sm">Correo electrónico</label>
                        <input 
                            type="email"
                            placeholder="Correo electrónico" 
                            className="bg-transparent outline-none border-none"
                            name="email"
                            onChange={ onInputChange }
                            value={ email }
                            required
                        />
                    </div>
                    {/* Campo número de teléfono */}
                    <div className="flex flex-col gap-1 rounded-xl bg-[#272A33] border border-[#272A33] p-3 w-full">
                        <label className="text-sm">Número de teléfono</label>
                        <div className="flex items-center gap-2">
                            <select className="bg-transparent outline-none border-none" name="prefix_telefono" onChange={ onInputChange } required>
                                {
                                    Object.entries(codeFlags).map(([code, data]) => (
                                        <option key={code} value={code}>
                                            {`${data.name} (+${code})`}
                                        </option>
                                    ))
                                }
                            </select>
                            <Image src={ codeFlags[prefix_telefono].flag } width={20} alt="flag-selected" />
                            <input 
                                type="text" 
                                placeholder="Número de teléfono" 
                                className="bg-transparent outline-none border-none"
                                name="nro_telefono"
                                onChange={ onInputChange }
                                value={ nro_telefono }
                                required
                            />
                        </div>
                    </div>
                    {/* Componente subir imágenes */}
                    <FileUploader setUrls={setUrls} />
                </div>
                <div className="flex flex-col gap-6 rounded-2xl py-6 px-4 bg-[#181A1F]">
                    <h3 className="text-xl text-[#9396A5]">Datos de facturación</h3>
                    <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-5 h-5 accent-[#FCB115]" />
                        <label className="text-sm font-semibold">Usar los mismos datos para la facturación</label>
                    </div>
                </div>
                <button 
                    type="submit"
                    className="rounded-lg py-3 bg-[#FCB115] text-[#111317] font-bold"
                >
                    Enviar
                </button>
                <ToastContainer />
            </form>

        </div>
    );
}
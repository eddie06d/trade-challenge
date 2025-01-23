"use client";

import ImageCarousel from "@/components/image-carousel";
import { Weather } from "@/components/weather";
import { codeFlags } from "@/helpers/code-flags";
import { fetchImages, fetchProfile, fetchWeather } from "@/helpers/profile";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ViewProfilePage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const [temperature, setTemperature] = useState<number | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [images, setImages] = useState<string[]>([]);

    // Efecto que obtiene las imágenes cargadas del usuario
    useEffect(() => {
        fetchImages(id as string).then((data) => setImages(data!.map((img) => img.url)));
    }, [id]);

    // Efecto que verifica si se ha creado un nuevo perfil
    useEffect(() => {
        if(searchParams.size > 0) {
            toast.success("Perfil creado exitosamente", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"
            });
            setProfile(Object.fromEntries(searchParams.entries()));
        } else fetchProfile(id as string).then(setProfile);
    }, [searchParams, id]);

    // Efecto que obtiene la ubicación del usuario y lo almacena en el localStorage
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
                localStorage.setItem('location', JSON.stringify(location));
              },
              (err) => {
                toast.warning(err.message);
              }
            );
        } else toast.warning('Geolocalización no soportada por este navegador');
    }, []);

    // Efecto que obtiene la temperatura actual según la ubicación
    useEffect(() => {
        if(localStorage.getItem('location')) {
            const { lat, lon } = JSON.parse(localStorage.getItem('location')!);
            fetchWeather(lat, lon).then((data) => setTemperature(data.current_weather.temperature));
        } else setTemperature(null);
    }, []);

    return (
        <div className="max-w-5xl flex flex-col my-7 mx-auto">
            <ToastContainer />
            <h1 className="mb-7 text-3xl font-extrabold text-center">TRD</h1>
            <div className="flex flex-col items-center md:flex-row md:items-start gap-5 mx-6">

                <div className="flex flex-col gap-6 w-3/4 md:w-1/2">
                    <h2 className="text-2xl font-semibold text-[#cccccc]">
                        Hola {profile?.nombres} {profile?.apellidos}
                    </h2>
                    <ImageCarousel images={images} />
                </div>

                <div className="flex flex-col gap-5 w-3/4 md:w-1/2">
                    <div className="flex gap-1 justify-end items-center">
                        <Weather temperature={temperature!} />
                    </div>
                    {/* Información personal */}
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-6 rounded-2xl py-6 px-4 bg-[#181A1F]">
                            <h3 className="text-xl text-[#9396A5]">Información personal</h3>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Nombres</p>
                                <p className="text-white">{profile?.nombres}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Apellidos</p>
                                <p className="text-white">{profile?.apellidos}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Tipo de documento</p>
                                <p className="text-white">{profile?.tipo_documento}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Número de documento</p>
                                <p className="text-white">{profile?.nro_documento}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Correo electrónico</p>
                                <p className="text-white">{profile?.email}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Número de teléfono</p>
                                <div className="flex items-center gap-2">
                                    <Image src={ codeFlags[profile?.prefix_telefono]?.flag } width={20} alt="flag-selected" />
                                    <p className="text-white">{profile?.nro_telefono}</p>
                                </div>
                            </div>
                        </div>
                        {/* Datos de facturación */}
                        <div className="flex flex-col gap-6 rounded-2xl py-6 px-4 bg-[#181A1F]">
                            <h3 className="text-xl text-[#9396A5]">Datos de facturación</h3>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Nombres</p>
                                <p className="text-white">{profile?.nombres}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Apellidos</p>
                                <p className="text-white">{profile?.apellidos}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Tipo de documento</p>
                                <p className="text-white">{profile?.tipo_documento}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Número de documento</p>
                                <p className="text-white">{profile?.nro_documento}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Correo electrónico</p>
                                <p className="text-white">{profile?.email}</p>
                            </div>
                            <div className="flex flex-col gap-1 rounded-xl border border-[#272A33] p-3 w-full">
                                <p className="text-sm text-[#9396A5]">Número de teléfono</p>
                                <div className="flex items-center gap-2">
                                    <Image src={ codeFlags[profile?.prefix_telefono]?.flag } width={20} alt="flag-selected" />
                                    <p className="text-white">{profile?.nro_telefono}</p>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
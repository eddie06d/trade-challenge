"use client";

import { deleteFile, uploadFiles } from "@/helpers/images";
import Image from "next/image";
import { useRef, useState } from "react";

export default function FileUploader({ setUrls }: { setUrls: React.Dispatch<string[]> }) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<FileList | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 4) {
            console.log("Solo puedes subir hasta 4 imágenes");
            setFiles(null);
            return;
        }

        setLoading(true);
        setFiles(files);

        const resp = await uploadFiles(files!, (progress: number) => {
            setProgress(progress);
        });
        setUrls(resp.data.urls);

        setLoading(false);
    };

    const handleDeleteFile = async (file: File) => {
        const key = file.name;

        await deleteFile(key);
        
        setFiles((prevFiles) => {
            const newFiles = new DataTransfer();
            Array.from(prevFiles!).forEach((file) => {
                if(file.name !== key) {
                    newFiles.items.add(file);
                }
            });
            return newFiles.items.length > 0 ? newFiles.files : null;
        });
    };

    return (
        <div 
            className="flex flex-col gap-3 w-full"
        >
            <input 
                type="file" 
                ref={ inputFileRef }
                onChange={ handleUploadFiles }
                accept="image/*"
                multiple 
                hidden 
            />
            <h3 className="text-xl text-[#9396A5]">
                { files ? "Imágenes cargadas" : "Carga hasta 4 imágenes en tu perfil" }
            </h3>
            {
                loading && (
                    <div 
                        className="relative flex rounded-xl bg-[#272A33] border border-[#272A33] h-14 overflow-hidden"
                    >
                        {
                            progress === 100 ? (
                                <p className="font-semibold absolute inset-0 flex items-center justify-center">
                                    <Image src="/icons/check-circle.svg" alt="icon-check-circle" />
                                </p>
                            ) : (
                                <p className="font-semibold absolute inset-0 flex items-center mx-3">Cargando documento(s)...</p>
                            )
                        }
                        <div className="h-full flex items-center px-3 rounded-xl" style={{ background: "linear-gradient(265.34deg, #FCB115 -18.6%, #E96DA2 67.73%, #00CDDA 111.5%)", width: `${progress}%` }}>
                        </div>
                    </div>
                )
            }
            {
                files && !loading && (
                    <div className="flex flex-col p-3 gap-2 rounded-xl bg-[#272A33] border" style={{ borderImageSource: "linear-gradient(265.34deg, #FCB115 -18.6%, #E96DA2 67.73%, #00CDDA 111.5%)", borderImageSlice: 1 }}>
                        {
                            Array.from(files).map(file => (
                                <div className="flex justify-between" key={file.name}>
                                    <p className="text-sm">{ file.name }</p>
                                    <Image 
                                        src="/icons/trash.svg" className="cursor-pointer" alt="trash-icon" 
                                        onClick={ () => handleDeleteFile(file) }
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                !files && (
                    <div 
                        className="flex gap-2 rounded-xl bg-[#272A33] border border-[#272A33] p-3 cursor-pointer"
                        onClick={ () => inputFileRef.current?.click() }
                    >
                        <Image src="/icons/download.svg" alt="download-icon" />
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">Haz clic o arrastra los archivos a esta área para cargarlo</p>
                            <p className="text-sm text-[#9396A5]">JPG, PNG, Tiff, hasta 2 mb</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
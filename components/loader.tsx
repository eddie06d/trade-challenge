import Image from "next/image";

export function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
            <Image src="/icons/loading.svg" className="animate-spin" alt="loading" />
            <div className="flex flex-col items-center gap-2 text-2xl font-semibold">
                <p>Estamos validando tus</p>
                <p>datos</p>
            </div>
        </div>
    ); 
}
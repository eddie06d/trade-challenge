import Image from "next/image";
import Link from "next/link";

export function ProfilesEmpty() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
            <Image src="no-data.svg" width={300} alt="no-data-img" />
            <p className="text-3xl text-[#9396A5]">No hay perfiles registrados</p>
            <Link href='/profile/create'>
                <button 
                    className="rounded-lg py-3 px-6 bg-[#FCB115] text-[#111317] font-bold text-lg"
                >
                    Crear perfil
                </button>
            </Link>
        </div>
    );
}
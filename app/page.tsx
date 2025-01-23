import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen">
        <div className="flex flex-col items-center gap-4">
            <p className="text-8xl text-[#9396A5]">Challenge</p>
            <p className="text-5xl font-extrabold">TRD</p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/profile">
                <button 
                    className="rounded-lg py-3 px-6 bg-[#FCB115] text-[#111317] font-bold"
                >
                    Listado de perfiles
                </button> 
            </Link>
            <Link href="/profile/create">
                <button 
                    className="rounded-lg py-3 px-6 bg-[#FCB115] text-[#111317] font-bold"
                >
                    Crear perfil
                </button>
            </Link>
        </div>
    </div>
);
}

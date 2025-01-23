import Link from "next/link";

export default function ProfileLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="p-3 flex flex-col">
            <Link href="/">
                <button className="text-xl rounded-lg bg-white text-black py-2 px-4">Inicio</button>
            </Link>
            {children}
        </div>
    );
}
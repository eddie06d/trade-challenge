"use client";

import { ProfilesEmpty } from "@/components/profiles-empty";
import { supabase } from "@/utils/supabase/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            const { data } = await supabase.from("usuarios").select("*");
            setLoading(false);
            setProfiles(data!);
        };
        fetchProfiles();
    }, []);

    if(loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-8">
                <Image src="/icons/loading.svg" className="animate-spin" alt="loading" />
            </div>
        );
    }

    if(profiles.length === 0) return <ProfilesEmpty />;
    
    return (
        <div className="flex flex-col items-center justify-center gap-8 min-h-screen">
            <p className="text-4xl text-[#9396A5]">Listado de perfiles</p>
            <table className="border">
                <thead>
                    <tr>
                        <th className="border p-2">Nro</th>
                        <th className="border p-2">Nombres</th>
                        <th className="border p-2">Apellidos</th>
                        <th className="border p-2">Nro documento</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile, index) => (
                        <tr key={profile.id}>
                            <td className="border p-2 text-center">{index + 1}</td>
                            <td className="border p-2 text-center">{profile.nombres}</td>
                            <td className="border p-2 text-center">{profile.apellidos}</td>
                            <td className="border p-2 text-center">{profile.nro_documento}</td>
                            <td className="border p-2 text-center">
                                <Link href={`/profile/${profile.id}`}>
                                    <button 
                                        className="rounded-lg p-2 bg-[#FCB115] text-[#111317] font-bold"
                                    >
                                        Ver detalles
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    );
}
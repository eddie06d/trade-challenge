"use client";

import { useState } from "react";

export default function ImageCarousel({ images }: { images: string[] }) {
    const [imgIndex, setImgIndex] = useState<number>(0);

    return (
        <div className="flex flex-col items-center gap-3">
            <img src={images[imgIndex]} alt={`img-${imgIndex}`} className="w-full object-cover rounded-2xl" />
            <div className="flex gap-2 bg-[#4B4B4B66] p-3 rounded-3xl">
                {
                    images.map((img, index) => (
                        <button key={index} onClick={() => setImgIndex(index)} className={`w-3 h-3 rounded-full bg-[#9396A5] ${index === imgIndex ? 'bg-[#FFFFFF]' : ''}`}></button>
                    ))
                }
            </div>
        </div>
    );
}
import { supabase } from "@/utils/supabase/config";
import axios from "axios";

const API_OPEN_METEO = "https://api.open-meteo.com/v1/forecast";

export const fetchProfile = async (id: string) => {
    const { data } = await supabase.from("usuarios")
        .select().eq("id", id).single();
    return data;
}

export const fetchWeather = async(lat: number, lon: number) => {
    const { data } = await axios.get(`${API_OPEN_METEO}?latitude=${lat}&longitude=${lon}&current_weather=true`);
    return data;
};

export const fetchImages = async (id: string) => {
    const { data } = await supabase.from("imagenes")
        .select("url").eq("user_id", id);
    return data;
}
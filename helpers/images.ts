import axios, { AxiosProgressEvent } from "axios";

export const uploadFiles = async(files: FileList, onProgress: Function) => {
    const formData = new FormData();
    for (const file of files) {
        formData.append('images', file);
    }

    try {
        const { data } = await axios.post('/api/images', formData, {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                onProgress(progress);
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Ocurrio un error al subir el archivo');
    }
};

export const deleteFile = async(key: string) => {
    const formData = new FormData();
    formData.append('key', key);

    try {
        const { data } = await axios.delete(`/api/images/${key}`);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Ocurrio un error al eliminar el archivo');
    }
};
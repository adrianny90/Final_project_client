import axios from 'axios';

const cloudinaryUpload = async(files)=>{
    const uploadedUrls = [];

    for (const file of files){
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset',import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
       

    try {
        const res = await axios.post(
            import.meta.env.VITE_CLOUDINARY_URL,
            data
        );
        uploadedUrls.push(res.data.secure_url);
    } catch (error) {
        console.error('error while uploading:',error);
        throw error;
    }
    }
    return uploadedUrls;
};

export default cloudinaryUpload;

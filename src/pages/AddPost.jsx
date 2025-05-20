import { useState } from "react"
import PhotoUpload from "../components.jsx/PhotoUpload";
import CategorySelect from "../components.jsx/CategorySelect";
// import formDataBuilder from "../Utils/formDataBuilder.js";
import cloudinaryUpload from "../../Utils/cloudinarayUpload.js";
import axios from "axios";
import Spinner from "../components.jsx/Spinner.jsx";

const AddPost = () => {

    //storage for formdata
const [formData,setFormData] = useState({
    photos: [],
    title: '',
    category:'',
    description:'',
    collectionTime:'',
    location:'',
});

const [previewUrls, setPreviewUrls] = useState([]);//storage for photo preview
const [error,setError] =useState(null)
const [isSubmitting, setIsSubitting] = useState(false)
const [successMsg,setSuccessMsg] = useState('');



    //storing input data while typing
const handleChange = (e) => {
    const {name,value,files} = e.target;

    if(name==='photos'){
        const selectedFiles = Array.from(files) //creating array from uploaded imgs, each img is an element in the array

        //upload limit = 5 photos
        if(formData.photos.length + selectedFiles.length > 5) {
            setError('Max 5 photos possible');
            return;
        }
        setError(null);

        const newUrls = selectedFiles.map((file)=> URL.createObjectURL(file));
        
    //adding photos to form data
    setFormData((prev)=>({
        ...prev,
        photos: [...prev.photos,...selectedFiles]
    }));
    setPreviewUrls(prev => [...prev, ...newUrls]);//showing existing and new photos in preview
} else {
    setFormData((prev)=> ({
        ...prev,
        [name] : value,
    }))
}
};

const handleSubmit = async(event) => {
    event.preventDefault();

    try {
        setIsSubitting(true);

        const uploadedPhotoUrls = await cloudinaryUpload(formData.photos);

        const dataToSend = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            collectionTime:formData.collectionTime,
            location: formData.location,
            photos: uploadedPhotoUrls,
        };

            console.log('data to send',dataToSend)
        const response = await axios.post('http://localhost:3000/items',dataToSend)
            // reset form after sendeing data
        setFormData({
            photos: [],
            title: '',
            category:'',
            description:'',
            collectionTime:'',
            location:'',
        });
        setPreviewUrls([]);
        setSuccessMsg('Item submitted succesfully');
    } catch (error) {
        console.log('Error while submitting', error);
        setError('Something went wrong while submitting')
    }  finally {
        setIsSubitting(false);
    }
    // checking the key-values pairs


    
}

    return (

        <div className="Item-container">
        <h2 className="item-header">Put a new item</h2>
        <form className="item-form" onSubmit={handleSubmit}>
            <PhotoUpload  previewUrls={previewUrls} error={error} onChange={handleChange}  />
            <div className="title-div">
                <label className="title-label" htmlFor="title">Title:</label>
                <input 
                type="text" 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                 />
            </div>
            
            <CategorySelect value={formData.category} onChange={handleChange} />

            <div className="description-div">
                <label className="description-label" htmlFor="description">Description</label>
                <textarea
                
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                rows={8}
                />
            </div>
            <div className="collection-div">
                <label className=" collection-label" htmlFor="collectionTime">Collection times</label>
                <input 
                type="text" 
                id="collectionTime"
                name="collectionTime"
                value={formData.collectionTime}
                disabled={isSubmitting}
                onChange={handleChange}
                />
            </div>
            <div className="lacoation-div">
                <label htmlFor="location">Where to pick</label>
                <input 
                type="text" 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                />
            </div>
            <button className="submit-button" type="submit" disabled={isSubmitting}>{isSubmitting?'Submitting...':'Submit offer'}</button>
        </form>
        <Spinner />
        {isSubmitting && <Spinner />}
        {successMsg && <p className="succes-message">{successMsg}</p>}
        
        </div>
    )
}

export default AddPost;

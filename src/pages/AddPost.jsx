import { useState } from "react"


const AddPost = () => {

    //storage for formdata
const [formData,setFormData] = useState({
    photos: [],
    title: '',
    description:'',
    collectionTime:'',
    location:'',
});

const [previewUrls, setPreviewUrls] = useState([]);
const [error,setError] =useState(null)


    //storing input data live
const handleChange = (e) => {
    const {name,value,files} = e.target;

    if(name==='photos'){
        const selectedFiles = Array.from(files)

        if(formData.photos.length + selectedFiles.length > 5) {
            setError('Max 5 photos possible');
            return
        }
        setError(null);

        const newUrls = selectedFiles.map((file)=> URL.createObjectURL(file));
        
    
    setFormData((prev)=>({
        ...prev,
        photos: [...prev.photos,...selectedFiles]
    }));
    setPreviewUrls(prev => [...prev, ...newUrls]);
} else {
    setFormData((prev)=> ({
        ...prev,
        [name] : value,
    }))
}
};

const handleSubmit = () => {
    console.log(formData.title)
}



    return (

        <div className="Item-container">
        <h2 className="item-header">Put a new item</h2>
        <form className="item-form" onSubmit={handleSubmit}>
            <div className="img-div">
                <label className="photo-label" htmlFor="photos">add Photo</label>
                <input 
                type="file" 
                id="photos"
                name="photos"
                accept="image/*"
                multiple
                onChange={handleChange}
                required
                />
                {error && <p className="error-message">{error}</p>}
                <div className="preview-grid">
                    {previewUrls.map((url,index)=>(
                        <img
                            key={index}
                            src={url}
                            alt={`Preview ${index+1}`}
                            className="preview-image"
                            />
                    ))}

                </div>
              </div>
            <div className="title-div">
                <label className="title-label" htmlFor="title">Title:</label>
                <input 
                type="text" 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                 />
            </div>
            <div className="description-div">
                <label className="description-label" htmlFor="description">Description</label>
                <textarea
                
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
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
                required
                />
            </div>
            <button className="submit-button" type="submit">submit offer</button>
        </form>
        
        </div>
    )
}

export default AddPost;

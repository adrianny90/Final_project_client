import { useState } from "react"


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

const [previewUrls, setPreviewUrls] = useState([]);
const [error,setError] =useState(null)


    //storing input data live
const handleChange = (e) => {
    const {name,value,files} = e.target;

    if(name==='photos'){
        const selectedFiles = Array.from(files) //creating array from uploaded img, each img is an element in the array

        //upload limit = 5 photos
        if(formData.photos.length + selectedFiles.length > 5) {
            setError('Max 5 photos possible');
            return
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

const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    formData.photos.forEach((photo)=>{
        data.append('photo',photo);
    });
    data.append('title',formData.title);
    data.append('categrory',formData.category);
    data.append('description',formData.description);
    data.append('collecionTime', formData.collectionTime);
    data.append('location', formData.location);
   
    for (let pair of data.entries()){
        console.log(pair[0], pair[1]);
    }
    
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
            <div className="category-div">
                <label className="category-label" htmlFor="title"></label>
                <select 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                 >
                    <option value="">All Cagegories</option>
                    <option value="">Furniture/Household</option>
                    <option value="">Electronics</option>
                    <option value="">Books</option>
                    <option value="">Services</option>
                    <option value="">Tickets</option>
                    <option value="">Hobby</option>
                    <option value="">For Kids</option>
                    <option value="">Clothes</option>
                    <option value="">Materials</option>
                    <option value="">Else</option>
                 </select>
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

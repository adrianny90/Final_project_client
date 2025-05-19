import { useState } from "react"


const AddPost = () => {

    //storage for formdata
const [formData,setFormData] = useState({
    photo: null,
    title: '',
    description:'',
    collectionTime:'',
    location:'',
});

const [previewUrl, setPreviewUrl] = useState(null);

    //storing input data live
const handleChange = (e) => {
    const {name,value,files} = e.target;

    if(files &&files[0]){
        const file = files[0];
        setFormData((prev)=> ({
            ...prev,
            [name]: file,
        }));
        setPreviewUrl(URL.createObjectURL(file));
    }
    setFormData((prev)=>({
        ...prev,
        [name]: value,
    }))
    console.log(formData)
}

const handleSubmit = () => {
    console.log(formData.title)
}



    return (

        <div className="Item-container">
        <h2 className="item-header">Put a new item</h2>
        <form className="item-form" onSubmit={handleSubmit}>
            <div className="img-div">
                <label className="photo-label" htmlFor="img">add Photo</label>
                <input 
                type="file" 
                id="img"
                name="img"
                accept="image/*"
                onChange={handleChange}
                required
                />
                {previewUrl && (
                    <img 
                    src={previewUrl} 
                    alt="Preview"
                    className="preview-image" 
                    
                    />
                )}
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

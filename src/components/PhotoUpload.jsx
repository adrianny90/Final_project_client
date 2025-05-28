const PhotoUpload = ({ previewUrls, error, onChange }) => (
  <div className="img-div">
    <label className="photo-label" htmlFor="photos">
      Add Photo
    </label>
    <input
      type="file"
      id="photos"
      name="photos"
      accept="image/*"
      multiple
      onChange={onChange}
      required
    />
    {error && <p className="error-message">{error}</p>}
    <div className="preview-grid">
      {previewUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Preview ${index + 1}`}
          className="preview-image"
        />
      ))}
    </div>
  </div>
);
export default PhotoUpload;

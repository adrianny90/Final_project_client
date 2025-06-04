const PhotoUpload = ({ previewUrls, error, onChange }) => (
  <div className="mb-6">
    <label htmlFor="photos" className="block text-black -mt-1.5">
      Add Photo (optional)
    </label>
    <input
      type="file"
      id="photos"
      name="photos"
      accept="image/*"
      multiple
      onChange={onChange}
      className="block w-full border border-black rounded-md text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-gray-600 file:text-white hover:file:bg-gray-700 transition"
    />
    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {previewUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Preview ${index + 1}`}
          className="w-full h-32 object-cover rounded-md shadow-md"
        />
      ))}
    </div>
  </div>
);

export default PhotoUpload;

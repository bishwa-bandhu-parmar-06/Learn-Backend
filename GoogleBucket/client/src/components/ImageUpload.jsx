import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(`${backendUri}/upload`, formData);
    setImageUrl(res.data.imageUrl);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" width="200" />}
    </div>
  );
}

export default ImageUpload;

import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const predictImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPredictions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Image Uploader and Classifier</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={predictImage} disabled={!selectedImage || loading}>
        Predict
      </button>
      {selectedImage && <img src={selectedImage} alt="Selected" width="300" />}
      {loading && <p>Loading predictions...</p>}
      <div>
        {predictions.map((prediction, index) => (
          <p key={index}>
            {prediction.className}: {Math.floor(prediction.probability * 100)}%
          </p>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;

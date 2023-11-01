const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer({ dest: 'uploads/' });

let model;

async function loadModel() {
  model = await mobilenet.load();
  console.log('Model loaded');
}

loadModel();

app.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const { file } = req;
    const imageBuffer = await sharp(file.path).resize(224, 224).toBuffer();
    const image = tf.node.decodeImage(imageBuffer, 3);
    const predictions = await model.classify(image);
    res.json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

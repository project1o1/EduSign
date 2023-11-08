const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

const flaskApiUrl = 'http://localhost:10000';

app.get('/', (req, res) => {
  res.send('Hello World');
}
);

app.post('/video', upload.single('video'), async (req, res) => {
  try {
    const { type, name } = req.query; // Access the query parameters instead of the body
    const videoFile = req.file;
    const UpperType = type.charAt(0).toUpperCase() + type.slice(1);
    console.log(UpperType, type, name);
    const formData = new FormData();
    formData.append('video', fs.createReadStream(videoFile.path));
    formData.append('name', name);
    formData.append('type', UpperType);
    // console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      params: {
        name: name,
        type: UpperType
      }
    };
    const response = await axios.post(`${flaskApiUrl}/video`, formData, config);
    console.log(response.data);

    // delete the file from the server
    fs.unlinkSync(videoFile.path);

    // res.status(200).send('Video uploaded and processed successfully');
    res.status(200).json(response.data);
  } catch (error) {
    // console.error(error);
    res.status(500).send('Internal server error');
  }
});


const port = 8173;
const httpsPort = 8000; // Choose a port for HTTPS

const privateKey = fs.readFileSync('./ssl_keys/flask.key', 'utf8'); // Replace with the path to your private key
const certificate = fs.readFileSync('./ssl_keys/flask.crt', 'utf8'); // Replace with the path to your SSL certificate
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(httpsPort, () => {
  console.log('HTTPS server started on port ' + httpsPort);
});

app.listen(port, () => {
  console.log('HTTP server started on port ' + port);
});
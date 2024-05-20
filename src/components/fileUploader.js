import React, { useState } from 'react';
import axios from 'axios';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [signedURLData, setSignedURLData] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getS3SignedURL = async () => {
    try {

      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMGNlYWM4NTEtZDIxZC00OTk5LWE2NTktN2U2MThlMjU5MmZlIiwiaWF0IjoxNzEyNTU4MjI4LCJleHAiOjE3MTUxNTAyMjh9.BRUTtaXN_8fb_xsZ_pfvZFZad12EL6_3mEX4U-lzaoU'
      let uuid = '8c2dd38f-fbd9-4cec-93b5-14a52948a501'
      const response = await axios.get(`http://localhost:3100/api/v1/workshop/getS3SignedUrl`, {
        headers: {
            'Authorization': `${authToken}`
            },
        params: {
            fileName: file.name,
            fileType: file.type,
            uuid: uuid
        }
        });
        
        console.log(response.data)
        setSignedURLData(response.data);
    } catch (error) {
      console.error('Error fetching signed URL:', error);
    }
  };

  const uploadFile = async () => {

    if (!file || !signedURLData) return;

    try {
      let url = signedURLData.data.signedURL;
      console.log(url)
      let res = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type
        }
      });
      console.log(res);
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const getFile = async () => {
    try {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMGNlYWM4NTEtZDIxZC00OTk5LWE2NTktN2U2MThlMjU5MmZlIiwiaWF0IjoxNzEyNTU4MjI4LCJleHAiOjE3MTUxNTAyMjh9.BRUTtaXN_8fb_xsZ_pfvZFZad12EL6_3mEX4U-lzaoU'
        const response = await axios.get(`http://localhost:3100/api/v1/workshop/getObjectUsingSignedUrl`, {
        headers: {
            'Authorization': `${authToken}`
            },
        params: {
            uuid: '8c2dd38f-fbd9-4cec-93b5-14a52948a501'
        }
        });
          
          console.log(response.data)
          setSignedURLData(response.data);
      } catch (error) {
        console.error('Error fetching signed URL:', error);
      }
  }



  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={getS3SignedURL}>Get Signed URL</button>
      <button onClick={uploadFile}>Upload File</button>
      <button onClick={getFile}>Get File</button>
    </div>
  );
}

export default FileUploader;

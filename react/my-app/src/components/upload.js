// pages/upload.js
import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
    const [pptFile, setPptFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);

    const handlePptFileChange = (event) => {
        setPptFile(event.target.files[0]);
    };

    const handleAudioFileChange = (event) => {
        setAudioFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('pptFile', pptFile);
        formData.append('audioFile', audioFile);

        try {
            const response = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Files uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="pptFile">Upload PowerPoint File:</label>
                <input type="file" id="pptFile" accept=".ppt,.pptx" onChange={handlePptFileChange} />
            </div>
            <div>
                <label htmlFor="audioFile">Upload Audio File:</label>
                <input type="file" id="audioFile" accept="audio/*" onChange={handleAudioFileChange} />
            </div>
            <button type="submit">Upload Files</button>
        </form>
    );
}

export default UploadPage;

// pages/presentation-page.js
import React, { useState } from 'react';
import axios from 'axios';

function PresentationPage() {
    const [pptFile, setPptFile] = useState(null); // State to store PowerPoint file
    const [audioFile, setAudioFile] = useState(null); // State to store audio file

    // Function to handle PowerPoint file input change
    const handlePptFileChange = (event) => {
        setPptFile(event.target.files[0]);
    };

    // Function to handle audio file input change
    const handleAudioFileChange = (event) => {
        setAudioFile(event.target.files[0]);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('pptFile', pptFile);
        formData.append('audioFile', audioFile);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Files uploaded successfully:', response.data);
            alert('Files uploaded successfully!');
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Failed to upload files.');
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Upload PowerPoint and Audio Files</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="pptFile">PowerPoint File:</label>
                    <input type="file" id="pptFile" accept=".ppt,.pptx" onChange={handlePptFileChange} required />
                </div>
                <div>
                    <label htmlFor="audioFile">Audio File:</label>
                    <input type="file" id="audioFile" accept="audio/*" onChange={handleAudioFileChange} />
                </div>
                <button type="submit" style={{ marginTop: "20px" }}>Upload Files</button>
            </form>
        </div>
    );
}

export default PresentationPage;

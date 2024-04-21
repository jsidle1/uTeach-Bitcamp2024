// pages/presentation-page.js
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

function PresentationPage() {
    const router = useRouter();
    const [file, setPptFile] = useState(null); // State to store PowerPoint file
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
        formData.append('file', file);
        formData.append('audioFile', audioFile);

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const results = await response.json();
                console.log(results)
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
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

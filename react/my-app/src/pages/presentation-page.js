import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useResults } from '../contexts/ResultsContext';
import axios from 'axios';
import styles from '@/pages/presentation-page.module.css'
import Link from 'next/link';

function PresentationPage() {
    const router = useRouter();
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

    // Drag and Drop handlers
    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    };

    const handleDrop = (event, fileType) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]; // Only consider the first file
        if (fileType === 'ppt' && file.type.includes('presentation')) {
            setPptFile(file);
        } else if (fileType === 'audio' && file.type.startsWith('audio/')) {
            setAudioFile(file);
        }
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('pptFile', pptFile);
        formData.append('audioFile', audioFile);
        console.log("RUNNING")
        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log("DONE")
                const results_gpt = await response.json();
                localStorage.setItem('userInfo', JSON.stringify(results_gpt))
                window.location.href = '/scoresheet';
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Failed to upload files.');
        }
    };


    function check() {
        console.log(results)
    }

    return (
        <div className={styles.background}>
            <Link href="/">
                <div className={styles.titleBox}>
                    <h1 className={styles.title}>uTeach</h1>
                </div>
            </Link>
            <div className={styles.uploadContainer}>
                <h1 className={styles.uploadHeader}>Upload PowerPoint and Audio Files</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="pptFile" className={styles.fileInputLabel}>PowerPoint File:</label>
                    <div
                        className={styles.uploadBox}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'ppt')}
                        onClick={() => document.getElementById('pptFile').click()}>
                        Drag and drop PowerPoint file here or click to browse
                    </div>
                    <input
                        type="file"
                        id="pptFile"
                        accept=".ppt,.pptx"
                        onChange={handlePptFileChange}
                        className={styles.fileInput}
                        required
                    />

                    <label htmlFor="audioFile" className={styles.fileInputLabel}>Audio File:</label>
                    <div
                        className={styles.uploadBox}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'audio')}
                        onClick={() => document.getElementById('audioFile').click()}>
                        Drag and drop audio file here or click to browse
                    </div>
                    <input
                        type="file"
                        id="audioFile"
                        accept="audio/*"
                        onChange={handleAudioFileChange}
                        className={styles.fileInput}
                    />

                    {/* Uploaded files list */}
                    <ul className={styles.fileList}>
                        {pptFile && <li className={styles.fileListItem}><span>{pptFile.name}</span></li>}
                        {audioFile && <li className={styles.fileListItem}><span>{audioFile.name}</span></li>}
                    </ul>

                    <button type="submit" className={styles.uploadBtn}>Upload Files</button>
                </form>
            </div>
        </div>
    );
}
export default PresentationPage;
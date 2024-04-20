import React from 'react';
import styles from "./upload-powerpoint.module.css";
import FileUploader from '@/components/FileUploader'; // Ensure the path is correct

const Home = () => {
    const handleFileSelect = (file) => {
        console.log("File selected:", file.name);
        // You can do client-side operations here, like reading the file
    };

    const handleFileSubmit = (file) => {
        console.log("Submitting file:", file.name);
        const formData = new FormData();
        formData.append('file', file);

        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Upload a PowerPoint</h1>
            <p className={styles.paragraph}>Submit your completed PowerPoint here:</p>
            <FileUploader 
                accept=".ppt, .pptx"
                onFileSelect={handleFileSelect}
                onSubmit={handleFileSubmit}
            />
        </div>
    );
};

export default Home;

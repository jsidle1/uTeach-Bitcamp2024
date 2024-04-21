import React, { useState } from 'react';
import styles from './FileUploader.module.css'; // Ensure the path is correct

const FileUploader = ({ accept, onFileSelect, onSubmit }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (onFileSelect) {
            onFileSelect(selectedFile);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file && onSubmit) {
            onSubmit(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.fileInputContainer}>
            <input
                type="file"
                onChange={handleFileChange}
                accept={accept}
                className={styles.fileInput}
            />
            <button type="submit" className={styles.submitButton}>Submit File</button>
        </form>
    );
};

export default FileUploader;
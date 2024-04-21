import React, { useState, useRef, useEffect } from 'react';
import styles from "./TextInput.module.css";

const TextInput = () => {
    const [inputValue, setInputValue] = useState('');
    const textAreaRef = useRef(null);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = 'auto'; // Reset the height to shrink if text is deleted
            textArea.style.height = `${textArea.scrollHeight}px`; // Expand to fit content
            if (textArea.scrollHeight > 300) { // Check if the scrollHeight is greater than max-height
                textArea.style.height = '300px'; // Set to max-height if exceeded
            }
        }
    }, [inputValue]); // Run on inputValue change

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputValue);
        console.log("running")
        fetch("http://127.0.0.1:5000/temp-gen-script", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputValue)
        }).then(
            res => res.blob()
        ).then(
            blob => {
                console.log("DOWNLOADING")

                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'presentation_LeanAi.pptx'); // or any other filename
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                console.log("DOWNLOADED")
            }
        ).catch(err => console.error("Couldn't download pptx file", err))
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.container}>
                <textarea
                    ref={textAreaRef}
                    className={styles.textArea}
                    value={inputValue}
                    onChange={handleInput}
                    placeholder="Enter a prompt to generate a powerpoint frame"
                />
                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </div>
            </div>
        </form>
    );
};

export default TextInput;

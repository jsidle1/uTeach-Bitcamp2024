import React, { useState, useRef, useEffect } from 'react';
import styles from "./TextInput.module.css";

const TextInput = () => {
    const [inputValue, setInputValue] = useState('');
    const textAreaRef = useRef(null);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    // Dynamically adjust the height of the textarea
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.container}>
                <textarea
                    ref={textAreaRef}
                    className={styles.textArea}
                    value={inputValue}
                    onChange={handleInput}
                />
                <button type="submit" className={styles.submitButton}>Submit</button>
            </div>
        </form>
    );
};

export default TextInput;

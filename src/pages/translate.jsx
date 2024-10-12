import React, { useEffect, useRef } from 'react';

const TranslateComponent = () => { // Fixed function declaration

    const googleTranslateRef = useRef(null); // Fixed variable declaration

    useEffect(() => {
        let intervalId;

        const checkGoogleTranslate = () => { // Fixed function declaration

            if (window.google && window.google.translate) // Fixed logical operator
                clearInterval(intervalId);

            new window.google.translate.TranslateElement(
                { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                googleTranslateRef.current
            );
        };

        intervalId = setInterval(checkGoogleTranslate, 100); // Fixed variable name

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    return (
        <div>
            <div ref={googleTranslateRef}></div> // Fixed ref syntax
        </div>
    );
};

export default TranslateComponent;
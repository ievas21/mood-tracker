// src/components/Footer.jsx

import React from 'react';

function Footer() {

    return (
        <>
            <footer>
                <p style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#ddeedf', color: 'rgb(70, 85, 72)' }}>
                    &copy; {new Date().getFullYear()} Journal Sentiment Analyzer. All rights reserved.
                </p>
            </footer>
        </>
    )
}

export default Footer;
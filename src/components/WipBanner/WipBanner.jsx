import React from 'react';
import viteLogo from '../../assets/vite.svg'
import reactLogo from '../../assets/react.svg'
import wipGears from '../../assets/images/banner-image.jpg'
import './WipBanner.css'

function WipBanner() {
    const bannerStyle = {
            backgroundImage: `url(${wipGears})`,
        };
    
    return (
        <div className="banner-area" style={bannerStyle}>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo animate-float" alt="Vite logo" />
          </a>
            <h1>Work In Progress</h1>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react animate-spin" alt="React logo"/>
          </a>
        </div>
    );
}

export default WipBanner;
import React from 'react'
import './Banner.css'

function Banner() {

  function truncate(string, n){
    return string?.length > n ? string.substr(0, n-1) + '...' : string;
  }
    const bannerStyle = {
        backgroundSize: "cover",
        backgroundImage: `url("https://i.imgur.com/e1hLQ2m.png")`,
        backgroundPosition: "center center"
    };
  return (
      <header className='banner' style={bannerStyle}>
        <div className='banner__contents'>
          <h1 className="banner__title">
            Movie Name
          </h1>
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner_description">This is a test description</h1>
        </div>

        <div className="banner--fadeBottom"></div>
      </header>
  )
}

export default Banner
import React from 'react'
import "./loader.css"


function Loader() {
  return (
    <div className='loaderContainer'>
        <div className="loaderSampleBox">
            <div className="loaderTitle">
                Signing Light Freelance
            </div>
            <div className="loaderSubTitle">
                Loading...
            </div>
            <div className="loaderAnimation spinner-grow text-warning" role={"status"}>

            </div>
        </div>
    </div>
  )
}

export default Loader
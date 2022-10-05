import React from 'react'
import { Link } from 'react-router-dom'
import "./Notfound.css"
import img from "./cloud.png";


function Notfound() {
    return (
        <>
            <img src={img} alt="404" className='notFoundImage1' />
            <img src={img} alt="404" className='notFoundImage2' />
            <div className='notFoundContainer'>
                <div className="notFound404">
                    404
                </div>
                <div className="notFound404Text">
                    Page Not Found
                </div>
                <Link to={"/"} className="notFoundContainerHome">
                    Home
                </Link>
            </div>
        </>
    )
}

export default Notfound

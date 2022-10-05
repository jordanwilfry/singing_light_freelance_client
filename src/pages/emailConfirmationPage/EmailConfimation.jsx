import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import "./EmailConfimation.css"

function EmailConfimation() {
    const token = useParams().token
    useEffect(() => {
     const confirmEmail = async() => {
        await axios.put(`/auth/confirmation/${token}`)
     }

     confirmEmail()
    }, [])
    
  return (
    <div className='EmailConfimationContainer'>
        <div className="EmailConfimationMainBox">
            Successful
        </div>
    </div>
  )
}

export default EmailConfimation
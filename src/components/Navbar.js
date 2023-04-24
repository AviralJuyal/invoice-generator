import React from 'react';
import img from './logo-icon.png';
import './style.css';


export default function Navbar() {
  return (
    <nav className='header'>
      
      {/* <div id='imgbg'> */}
          <div className="imgset">
            <img className="img1" src={img} alt="" />
          </div>
      {/* </div> */}
        
      <div className='nav1'>
        
        <div id='heading'>
          <h1 id='head'>Monkhood Living Solutions Pvt. Ltd.</h1> 
        </div>
      
      <div id='smallHead'>
        <p >IIF ,Delhi Technological University , Shahbad Daulatpur Village , Rohini , Delhi , 110042, india</p>
        <div style={{display:'flex'}}>

        <p style={{marginTop:'-12px' , marginRight:'50px'}}><b>CIN NO :</b>U74999DL2019PTC354036</p>
        <p style={{marginTop:'-12px'}}><b>Mobile :</b> 9560346254</p>
        </div>
        <p style={{marginTop:'-12px'}}><b>GST NO :</b>07AAMCM8890R1Z7</p>
      </div>

      </div>

    </nav>
  )
}

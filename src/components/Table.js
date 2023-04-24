import React from 'react'
// import { useState } from 'react'
import Footer from './Footer';

export default function Table(props) {
  console.log(props.items);
  let count=0;   let totalAmount = 0.0;
  let amount=0;
  // console.log(props.discount);
  // console.log(props.gst);
  return (
    <div className='posTable'>
    
    <p><b>BILL TO</b></p>
    <p style={{marginTop:'-14px'}}><b>{props.Name}</b></p>
    <p style={{marginTop:'-14px'}}>Mobile number : {props.Number}</p>

  <table className="table " style={{marginTop:'-10px'}}>
  <thead>
    <tr className="table-group-divider">
      <th scope="col" colSpan="4">Service</th>
      <th scope="col" className='mainTable'>QTY</th>
      <th scope="col" className='mainTable'>RATE</th>
      <th scope="col" className='mainTable'>AMOUNT</th>
    </tr>
    <tr className="table-group-divider"></tr>
  </thead>

  <tbody>
    {props.items.map((e , i)=>{ 
      count = count + parseInt(e.units)
      amount = parseInt(e.pricePerUnit) * parseInt(e.units);
      totalAmount = totalAmount +amount;
      
      return <tr key={i}>
      <td colSpan="4">{e.entity}</td>
      <td  className='mainTable'>{e.units}</td>
      <td className='mainTable'>{e.pricePerUnit}</td>
      
      <td className='mainTable'>{amount}</td>
     
    </tr>
    })

    }
    
  </tbody>

</table>
    
    <Footer totalAmount = {totalAmount} gst={props.gst} discount={props.discount} count = {count}/>

   
    </div>
  )
}

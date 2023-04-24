import React from 'react'

export default function Form(props) {

    let c =0;
    
      const handleThingChange = (i, str, val) => {
        props.setFormData(formData => {
          const thingsGiven = [...formData.thingsGiven];
          thingsGiven[i] = { ...thingsGiven[i], [str]: val };
          if (i === thingsGiven.length - 1) {
            c++;
            thingsGiven.push({ entity: "", units: "", pricePerUnit: "" });
          }
          return { ...formData, thingsGiven };
        });
      }
    
      const handleThingDelete = (i) => {
        props.setFormData(formData => {
          const thingsGiven = [...formData.thingsGiven];
          thingsGiven.splice(i, 1);
          return { ...formData, thingsGiven };
        });
      }
    
      const handleName = (val)=>{
        props.setFormData(formData =>{
          
          formData.Name = val;
          return {...formData}
        });
      }

      const handleNumber = (val)=>{
        props.setFormData(formData =>{
          
          formData.Number = val;
          return {...formData}
        });
      }

      const handleInvoiceNum = (val)=>{
        props.setFormData(formData =>{
          
          formData.invoiceNum = val;
          return {...formData,}
        });
      }

      const handleEmail = (val)=>{
        props.setFormData(formData =>{
          
          formData.email = val;
          return {...formData}
        });
      }

      const handleDiscount = (val)=>{
        props.setFormData(formData =>{
          formData.discount = val;
          return {...formData}
        });
      }

      const handleGst = (val)=>{
        props.setFormData(formData =>{
          formData.gst = val;
          return {...formData}
        });
      }

      const calculateTotalRent = () => {
          return props.formData.thingsGiven.slice(0, -1).reduce(((total, thing) => total + parseInt(thing.units) * parseInt(thing.pricePerUnit)), 0);
        }
    
      const submitForm = ()=>{
        handleThingDelete(c-1);
        document.getElementById('contentInvoice').style.display = 'block';
        document.getElementById('form').style.display = 'none';
      }

      

  return (
  
    <div id='form' className='mx-4 form container'>
      <form onSubmit={e=>{
        e.preventDefault();
        submitForm();
      }}>

      <div className='my-4'>
        <h3 className='my-4 mx-2'>Enter Your Details</h3>
      <input type="text"  className='mx-2' placeholder='Enter Name ' onChange={(e)=>handleName(e.target.value) } required />
      <input type="number" min={0} className='mx-2' placeholder='Enter Mobile Number' onChange={(e)=>handleNumber(e.target.value) } required/>
      <input type="number" min={0}  className='mx-2' placeholder='Enter Invoice Number' onChange={(e)=>handleInvoiceNum(e.target.value) } required/>
      <input type="Email" className='mx-2' placeholder='Enter Email' onChange={(e)=>handleEmail(e.target.value) } required/>
      <hr />
      </div>
         <div className="mb-6">
              <h4 className='my-3 mx-2'> Enter Your items :</h4>
                {/* <label htmlFor="thingsGiven" >Things given:</label> */}
                {props.formData.thingsGiven.map((thing, i) => (
                  <div key={i}>
                    <div key={i} className='relative my-2.5 flex flex-wrap items-center gap-2'>
                        {i!== props.formData.thingsGiven.length -1 && (
                            <button style={{borderRadius: '10px'}} onClick={()=>handleThingDelete(i)}>X</button>
                            )}
                      <input type="text" className='m-2' placeholder='Enter the entity' value={thing.entity} onChange={(e) => handleThingChange(i, "entity", e.target.value)} />
                      <input type="number" min={0} className='m-2' placeholder='Enter the no. of units' value={thing.units} onChange={(e) => handleThingChange(i, "units", e.target.value)} />
                      <input type="number" min={0} className='m-2' placeholder='Enter the price per unit' value={thing.pricePerUnit} onChange={(e) => handleThingChange(i, "pricePerUnit", e.target.value)} />
                    </div>
                    {/* <hr /> */}
                  </div>
                ))}
                


              <div className="my-3">
                <hr />
                  <input type="number" min={0} id='gst'className='mx-2' style={{cursor:'pointer'}}  onChange={(e)=>handleGst(e.target.value) } /> GST <br /> <br />
                <span>Total Rent: </span>
                <span>{calculateTotalRent() || ""}</span>
              </div>
              </div>
                <input type="number" min={0} className='mx-1 my-3' placeholder='Discount (in rupees)' onChange={(e)=>handleDiscount(e.target.value) } /> <br />

              <button type='submit'  style={{borderRadius: '10px'}} className='btn btn-secondary'>Preview</button>
              </form>
    </div>
  )
}

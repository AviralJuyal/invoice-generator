import React , {useState} from 'react';
import { jsPDF } from "jspdf";
// import { useRef} from 'react';
import './App.css';
import Table from './components/Table';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Gmail from './components/Gmail';

function App() {

  // let pdfUrl;
  let date = new Date();
  let day = date.getDate();
  // let day = date.getUTCDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear()
  // console.log(date.getDate());
  
  
  // let uniqueNum = 1;
  const [formData, setFormData] = useState({
    Name:'',
    Number:'0',
    invoiceNum : '0',
    email:'',
    pdfUrl:'',
    discount:0,
    gst:0,
    invoiceDate : `${day} - ${month} - ${year}`,
    thingsGiven: [{ entity: "", units: "0", pricePerUnit: "0" }],
  });
  // const canvas = useRef();
  

 const convertToPdf = async()=>{
  // console.log(formData);
  const invNum = formData.invoiceNum;
  const doc = new jsPDF('p' , 'pt' ,'a4' ,true);
    doc.html(document.querySelector('#content'), {
    callback: async function(pdf){
      let pageCount = doc.getNumberOfPages();
      for(let i=2;i<=pageCount;i++){
        pdf.deletePage(i);
      }
      for(let i=2;i<=pageCount;i++){
        pdf.deletePage(i);
      }
      for(let i=2;i<=pageCount;i++){
        pdf.deletePage(i);
      }
      pdf.deletePage(2);
      let d = prompt('Do u want to download it on your system as well?' , 'yes');
      console.log(d);
      if(d === 'yes')
        pdf.save('a.pdf');
        
      var blob = doc.output('blob');
      // console.log(blob);

      // console.log(formData);
      var formData = new FormData();
      formData.append('public_id' , `Invoice ${invNum}`);
    const url = "https://api.cloudinary.com/v1_1/dx6zhrun8/image/upload";
    let file = blob;
    formData.append("file", file);
    formData.append("upload_preset", "tempImg");

    let response = await fetch(url, {
      method: "POST",
      body: formData
      
    })
    let data =  await response.json();
    // const pdfUrl = data.secure_url;
    setFormData(formData=>{
      formData.pdfUrl = data.secure_url;
      return {...formData};
    });
    // document.getElementById('mailBtn').innerHTML('dd')
    if(data.existing === true){
      alert(`Invoice number ${invNum} already exists `);
    }
    else if(data.existing === false){
      alert("Pdf uploaded successfully !!")
    }
    else{
      alert('error');
    }
    // console.log(data);

    }
  })

}
const backForm = ()=>{
  document.getElementById('contentInvoice').style.display = 'none';
  document.getElementById('form').style.display = 'block';
  formData.thingsGiven.push({ entity: "", units: "", pricePerUnit: "" });
}

  return (
    <>
     <Form formData = {formData} setFormData = {setFormData} />
    <div id='contentInvoice'>
     <div id="content" >
      <div className=''>

     <Navbar />
    
    {/* <canvas id="canvas" height="8px" ref={canvas} width="575px" ></canvas> */}
    <div className='seperator'></div>
   
    <div className='belowHead'>
      <p id='p1'>Invoice Number : {formData.invoiceNum}</p> <p id='p2'>Invoice Date : {formData.invoiceDate}</p>
    </div>

    </div>
    <div className='bills'>
    
    <Table discount = {formData.discount} gst={formData.gst} Name = {formData.Name} Number = {formData.Number} items = {formData.thingsGiven}/>
    </div>
    </div>
    {/* <div id='data'></div> */}

     <button id="btn" onClick={convertToPdf} className='btn btn-secondary my-3 mx-3 px-3' style={{borderRadius : '10px'}}>Generate pdf</button>
      <button onClick={backForm} className='btn btn-secondary my-2 mx-2 px-3 ' style={{borderRadius : '10px'}}>Back</button>
      <Gmail email = {formData.email} invoiceNum = {formData.invoiceNum} pdfUrl = {formData.pdfUrl}/>

    </div>
    </>
  );
}

export default App;

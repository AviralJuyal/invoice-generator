import React from 'react'


export default function Footer(props) {

  var th = ['','Thousand','Million', 'Billion','Trillion'];
var dg = ['Zero','One','Two','Three','Four', 'Five','Six','Seven','Eight','Nine'];
 var tn = ['Ten','Eleven','Twelve','Thirteen', 'Fourteen','Fifteen','Sixteen', 'Seventeen','Eighteen','Nineteen'];
 var tw = ['Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
 
 function toWords(s) {
  s = s.toString();
  s = s.replace(/[, ]/g,'');
  if (s != parseFloat(s)) return 'not a number';
  var x = s.indexOf('.');
  if (x == -1)
      x = s.length;
  if (x > 15)
      return 'too big';
  var n = s.split(''); 
  var str = '';
  var sk = 0;
  for (var i=0;   i < x;  i++) {
      if ((x-i)%3==2) { 
          if (n[i] == '1') {
              str += tn[Number(n[i+1])] + '  ';
              i++;
              sk=1;
          } else if (n[i]!=0) {
              str += tw[n[i]-2] + ' ';
              sk=1;
          }
      } else if (n[i]!=0) { // 0235
          str += dg[n[i]] +' ';
          if ((x-i)%3==0) str += 'hundred ';
          sk=1;
      }
      if ((x-i)%3==1) {
          if (sk)
              str += th[(x-i-1)/3] + ' ';
          sk=0;
      }
  }
  
  if (x != s.length) {
      var y = s.length;
      str += 'point ';
      for (i=x+1; i<y; i++)
          str += dg[n[i]] +' ';
  }
  return str.replace(/\s+/g,' ');
}

  // let str = toWords(1000);
  // console.log(str);
  let grandTotal;
  if(parseInt(props.gst)>0){
    if(props.discount == 0 ){

      grandTotal = props.totalAmount + (props.totalAmount* parseInt(props.gst))/100;
      grandTotal = Math.round(grandTotal);
      console.log('h')
    }
    else{
      grandTotal = props.totalAmount - parseInt(props.discount);
      grandTotal = grandTotal +(grandTotal*parseInt(props.gst))/100 ;
      console.log(parseInt(props.gst))
      grandTotal = Math.round(grandTotal);
    }
  }
  else{
    if(props.discount == 0 ){

      grandTotal = props.totalAmount;
      grandTotal = Math.round(grandTotal);
    }
    else{
      grandTotal = props.totalAmount - props.discount;
      grandTotal = Math.round(grandTotal);
    }
  }
  
  return (
    <>
     <div className="footer ">
     <table className='table' style={{marginTop:'50px'} }>
      <tfoot>
       <tr className="table-group-divider">
        <td ><b>SUBTOTAL</b></td>
        <td className='' style={{textAlign:'start'}}>{props.count}</td>
        <td className='' style={{textAlign:'start'}}></td>

        <td className='mainTable'>{props.totalAmount}</td>
      </tr>
     <tr className="table-group-divider"></tr>
      </tfoot>
    </table>
    
      <div className='row1'>

      <div className="bankDetails">
        <p>
          <b>BANK DETAILS</b> <br/>
          A/C Holder Name :&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;MONKHOOD LIVING&nbsp; SOLUTIONS&nbsp;&nbsp;&nbsp;PRIVATE &nbsp; LIMITED <br />
          Account Number : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;251511061968 <br />
          IFSC&nbsp;&nbsp;code : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INDB0000849 <br />
          Bank : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Indusind Bank, SECTOR &nbsp;
          NINE ROHINI DELHI
        </p>      
      </div>

    <div className='footerTable'>
      <table className='table table-sm '>
      <tfoot>
        <tr>
          <td colSpan="2">Discount</td>
          <td className='mainTable'>{props.discount}</td>
        </tr>
        <tr>
          <td colSpan="2">{props.gst?'GST':''}</td>
          <td className='mainTable'>{props.gst>0?props.gst+'%':''}</td>
        </tr>
        <tr>
          <td colSpan="2"><b>GRAND TOTAL</b></td>
          <td className='mainTable'>{grandTotal}</td>
        </tr>
        </tfoot>
      </table>

    {/* <div className='sign'>
      <img src={img} alt="" />
      <p>
      Authorised Signature for Monkhood Living Solutions Pvt. Ltd.
      </p>
    </div> */}
    
    <div className='numTOWord mainTable' > 
        <b> Total Amount (in Words) </b>
      <p>{toWords(grandTotal)}</p>
    </div>
    </div>
    </div>
    {/* <Gmail /> */}
    </div>
    </>
  )
}

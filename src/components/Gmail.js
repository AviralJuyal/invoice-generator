import React from 'react';
// import Email from 'smtp.js'
export default function Gmail(props) {
    function sendEmail(){
        console.log(props.pdfUrl);
        window.Email.send({
            SecureToken : "ba118a39-7087-4d4f-b343-b1172cc7793b",
            To: props.email,
            From: "justfortest999999999@gmail.com",
            Subject: "Invoice",
            Body: "",
            Attachments : [
                {
                    name : `Invoice ${props.invoiceNum}.pdf`,
                    path : `${props.pdfUrl}`
                }]
        }).then(
            message =>{
                console.log (message);
                if(message=='OK'){
                alert('Your mail has been send. Thank you for connecting.');
                }
                else{
                    console.error (message);
                    alert('There is error at sending message. ')
                }
            }
        );
    }
    // sendEmail();
  return (
    <div>
        <button  id='mailBtn' onClick={sendEmail} className= 'btn btn-secondary mx-3'>Send Email</button>
    </div>
    

  )
}

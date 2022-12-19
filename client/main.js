


 
   
 function Sub()
 {
    
  
  var boxvalue1=document.getElementById("chequeNum").value;
  var boxvalue2=document.getElementById("invoiceNum").value;
  
  var boxvalue3=document.getElementById("Bank").value;
  var boxvalue4=document.getElementById("CustomerName").value;
 
  
  var Date3 = document.getElementById("date3").value;
  var Date4 = document.getElementById("date4").value;
 
 if (boxvalue1==""||boxvalue2==""||boxvalue3==""||boxvalue4==""||Date3==""||Date4=="") {
   alert("please fill all the fields")
 }else{
   alert("you successfully submitted");
  }

var payload = {
          "CustomerName":document.getElementById("CustomerName").value,
            
             "InvoiceNumber":document.getElementById("invoiceNum").value,
             "InvoiceDate":document.getElementById("date3").value,
             "ChequeNumber":document.getElementById("chequeNum").value,
             "PostDate":document.getElementById("date4").value,
              "BankName":document.getElementById("Bank").value,
               
               
               }
        let myHeaders =new Headers();
        myHeaders.append("Content-Type","application/json");
        let raw = JSON.stringify(payload);
        let requstOptions= {
            method:"POST",
            headers:myHeaders,
             body:raw,
            redirect:"follow"
        };
        fetch("/server/my_task_function/Sub",requstOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error'.error));
 
//  var element = document.createElement("td");

//  var text = document.createTextNode(boxvalue1);
//  element.appendChild(text);
//  var inputs=document.getElementById("inputs");
//  inputs.appendChild(element);

//  var element2 = document.createElement("td");
//  var text2 = document.createTextNode(boxvalue2);
//  element2.appendChild(text2);
//  var inputs2=document.getElementById("inputs");
//  inputs2.appendChild(element2);

//  var element3 = document.createElement("td");
//  var text3 = document.createTextNode(boxvalue3);
//  element3.appendChild(text3);
//  var inputs3=document.getElementById("inputs");
//  inputs3.appendChild(element3);

//  var element4 = document.createElement("td");
//  var text4 = document.createTextNode(Date2);
//  element4.appendChild(text4);
//  var inputs4=document.getElementById("inputs");
//  inputs4.appendChild(element4);

//  var element5 = document.createElement("td");
//  var text5 = document.createTextNode(Date3);
//  element5.appendChild(text5);
//  var inputs5=document.getElementById("inputs");
//  inputs5.appendChild(element5);

//  var element6 = document.createElement("td");
//   var text6 = document.createTextNode(Date4);
//  element6.appendChild(text6);
//  var inputs6=document.getElementById("inputs");
//  inputs6.appendChild(element6);

//  var element7 = document.createElement("td");
//  var text7 = document.createTextNode(boxvalue4);
//  element7.appendChild(text7);
//  var inputs7=document.getElementById("inputs");
//  inputs7.appendChild(element7);
 
 
 document.getElementById("chequeNum").value="";
 document.getElementById("invoiceNum").value="";
 document.getElementById("Bank").value="";
 
 
   document.getElementById("date3").value="";
   document.getElementById("date4").value="";
   document.getElementById("CustomerName").value="";
   document.getElementById("Amount").value="";
 }
 
 
 
  function checking(){
   
   var Date3= document.getElementById("date3").value;
   var Date4 = document.getElementById("date4").value;
   const today = new Date();
   const yyyy = today.getFullYear();
   let mm = today.getMonth() + 1; 
   let dd = today.getDate();
   
   if (dd < 10) dd = '0' + dd;
   if (mm < 10) mm = '0' + mm;
   
   const formattedToday = yyyy +'-' + mm + '-' + dd;
  
   if (Date3==""||Date4==""){
     alert("please fill Date fields");
 
   }
   if(formattedToday===Date4){
     alert("cheque Alive You can use it");
   }
   else{
     alert("cheque Bounced");
   }
  }
 
  function cancel(){
   
 
   document.getElementById("chequeNum").value ="";
   document.getElementById("invoiceNum").value="";

   document.getElementById("Bank").value="";
   document.getElementById("customerName").value="";
   
   
    document.getElementById("date2").value="";
     document.getElementById("date3").value="";
     document.getElementById("date4").value="";
    
  }
  
  function show(){
    const cus_Name = document.getElementById("CustomerName").value;
       
    fetch(`/server/my_task_function/show/${cus_Name}`)
  .then(response => response.json())
  .then(result => {console.log(result) 
    let tableData="";
    for(let j=0;j<result.invoices.length;j++)
      { tableData+=`
    <option value=${values.invoices[i].invoice_number}>${values.invoices[i].invoice_number}</option>`;
    }
    document.getElementById("invoiceNum").innerHTML=tableData;

        for(let i=0;i<result.invoices.length;i++){
              const invoiceID =result.invoices[i].invoice_id
             const cusID= result.invoices[i].customer_id
             const cusName= result.invoices[i].customer_name
              const dueDate=result.invoices[i].due_date
              const status= result.invoices[i].current_sub_status
              const invoiceNum =result.invoices[i].invoice_number
              storeData(invoiceID,cusID,cusName,dueDate,status,invoiceNum);
     }
  })
  .catch(error => console.log('error'.error));
  

 }

 function storeData(invoiceID,cusID,cusName,dueDate,status,invoiceNum){
          
    const payload={
      "CustomerName":cusName,
      "InvoiceNumber":invoiceNum,
      "InvoiceID":invoiceID,
      "CustomerID":cusID,
      "DueDate":dueDate,
      "Status":status
        }
        let myHeaders =new Headers();
        myHeaders.append("Content-Type","application/json");
        let raw = JSON.stringify(payload);
        let requstOptions= {
            method:"POST",
            headers:myHeaders,
             body:raw,
            redirect:"follow"
        };
        fetch("/server/my_task_function/storeData",requstOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error'.error));

 }
 

 function retrive(){
   console.log("hi")
  fetch("/server/my_task_function/retrive")
  .then(response => response.json())
  .then(result => {console.log(result)
    let tableData="";
    result.map((values)=>{
       tableData+=`<tr> 
       <td>${values.PDC_cheque.CustomerName} </td> 
       <td>${values.PDC_cheque.InvoiceNumber} </td>
       <td>${values.PDC_cheque.InvoiceDate }</td>
       <td>${values.PDC_cheque.ChequeNumber}</td>
       <td>${values.PDC_cheque.PostDate}</td>
        <td>${values.PDC_cheque.BankName}</td>
       <td><button>paynow</button></td>
          </tr>`;
    });
    document.getElementById("table_body").innerHTML=tableData;
  })
  .catch(error => console.log('error'.error));
 }

 
 
 function pay(){ 
  console.log("hi")
  const PaymentMode="cheque";
  const options ={
    "customer_id":document.getElementById("chequeNum").value,
   " payment_mode":PaymentMode,
   "amount":document.getElementById("Amount").value,
   "date":document.getElementById("date4").value,
   "invoice_id":document.getElementById("invoiceNum").value.trim,
   "amount_applied":document.getElementById("Amount").value
  }
  let myHeaders =new Headers();
  myHeaders.append("Content-Type","application/json");
  let raw = JSON.stringify(options);
  let requstOptions= {
      method:"POST",
      headers:myHeaders,
       body:raw,
      redirect:"follow"
  };
 
 
  fetch(`/server/my_task_function/pay`,requstOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error'.error));
 }
 
 
 
 
 
 

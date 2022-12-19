

function save(){

    var boxvalue1=document.getElementById("cusName").value;
    var boxvalue2=document.getElementById("chequeNum").value;
    var boxvalue3=document.getElementById("billNum").value;
    var boxvalue4=document.getElementById("Bank").value;
   
   
    var BillDate = document.getElementById("Billdate").value;
   
    if (boxvalue1==""||boxvalue2==""||boxvalue3==""||boxvalue4==""||BillDate=="") {
       alert("please fill all the fields")
     }else{
       alert("you successfully submitted");
     }
   
     var payload = {"CustomerName":document.getElementById("cusName").value,
     "ChequeNumber":document.getElementById("chequeNum").value,
      "BillNumber":boxvalue3=document.getElementById("billNum").value,
       "BankName":document.getElementById("Bank").value,
       "BillDate":document.getElementById("Billdate").value
       }
var myHeaders =new Headers();
myHeaders.append("Content-Type","application/json");
var raw = JSON.stringify(payload);
var requstOptions= {
    method:"POST",
    headers:myHeaders,
     body:raw,
    redirect:"follow"
};
fetch("/server/my_task_function/save",requstOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error'.error));

var element = document.createElement("td");
var text = document.createTextNode(boxvalue1);
element.appendChild(text);
var inputs=document.getElementById("inputs");
inputs.appendChild(element);

var element2 = document.createElement("td");
var text2 = document.createTextNode(boxvalue2);
element2.appendChild(text2);
var inputs2=document.getElementById("inputs");
inputs2.appendChild(element2);

var element3 = document.createElement("td");
var text3 = document.createTextNode(boxvalue3);
element3.appendChild(text3);
var inputs3=document.getElementById("inputs");
inputs3.appendChild(element3);

var element4 = document.createElement("td");
var text4 = document.createTextNode(boxvalue4);
element4.appendChild(text4);
var inputs4=document.getElementById("inputs");
inputs4.appendChild(element4);

var element5 = document.createElement("td");
var text5 = document.createTextNode(BillDate);
element5.appendChild(text5);
var inputs5=document.getElementById("inputs");
inputs5.appendChild(element5);
   
    document.getElementById("cusName").value="";
    document.getElementById("chequeNum").value="";
    document.getElementById("billNum").value="";
    document.getElementById("Bank").value="";
   }

   async function view() {

    var cusName=document.getElementById("cusName").value;
    fetch(`/server/my_task_function/view/${cusName}`)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error'.error));


    }
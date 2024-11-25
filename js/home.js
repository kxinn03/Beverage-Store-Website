startTime();
setInterval("startTime()", 1000);

function startTime()
{
   var today = new Date();
   var localTime = today.toLocaleTimeString();
   var ThisDay=today.getDate();
   var ThisMonth=today.getMonth()+1;
   var ThisYear=today.getFullYear();  

  var MonthTxt = new Array("", "January", "February", "March", "April", "May", 
  "June", "July", "August", "September", "October","November", "December");

   document.getElementById("currentdate").innerHTML = MonthTxt[ThisMonth] + " " + ThisDay + ", " + ThisYear + " " + localTime;
} 
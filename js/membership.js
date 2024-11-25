window.onload = init;

function init()
{
    document.getElementById('fname').focus();
}

document.forms[0].onsubmit = function() 
{
    if (this.checkValidity()) 
	{
		if (confirm("Are sure that all the informations you filled in is correct? Submit now?") == 1)
		{
			name = document.getElementById('lname').value;
			alert( name + " , your information has been successfully submitted. We will send your membership id via email.")                   
		} 
		else 
		{ 
			alert("You can register at our physical store.");
			window.location="/html/membership.html";
		}
    }     
}
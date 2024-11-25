window.onload=setForm;

function setForm(){
    document.forms[0].onsubmit = function(){
        if(this.checkValidity()) alert("We Appreciate Your Feedback.");
        return true;
    }
}

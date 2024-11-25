const prevbuttons = document.querySelectorAll(".buttonprev");
const nextbuttons = document.querySelectorAll(".buttonnext");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".formstep");
const progressSteps = document.querySelectorAll(".progressstep");

let formStepsNum = 0;

nextbuttons.forEach((button) => {
   button.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevbuttons.forEach((button) => {
   button.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("formstep1") &&
      formStep.classList.remove("formstep1");
  });

  formSteps[formStepsNum].classList.add("formstep1");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progressstep1");
    } else {
      progressStep.classList.remove("progressstep1");
    }
  });

  const progressActive = document.querySelectorAll(".progressstep1");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

window.onload = init;

function init() {
   document.getElementById("Delivery").onclick = turnOnDelivery;
   document.getElementById("Pickup").onclick=turnOnPickup;
   document.getElementById("Cash").onclick = turnOnCash;
   document.getElementById("Debit Card").onclick=turnOnDebitCard;
}

function turnOnDelivery() {
   document.getElementById("address").disabled=false;
   document.getElementById("postcode").disabled=false;
}

function turnOnPickup() {
  document.getElementById("address").disabled=true;
  document.getElementById("postcode").disabled=true;

}

function turnOnCash() {
  document.getElementById("num").disabled=true;
  document.getElementById("exp").disabled=true;
  document.getElementById("cvv").disabled=true;

}

function turnOnDebitCard() {
  document.getElementById("num").disabled=false;
  document.getElementById("exp").disabled=false;
  document.getElementById("cvv").disabled=false;

}

function myFunction() {
  if (confirm("Cancel Your Order?")) {
    window.location="/html/detail_page.html";
  } else {
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const steps = Array.from(document.querySelectorAll(".formstep"));
  const nextButtons = document.querySelectorAll(".buttonnext");
  const prevButtons = document.querySelectorAll(".buttonprev");
  const submitButton = document.querySelector(".complete");
  const progress = document.getElementById("progress");
  let currentStep = 0;

  // Show the current step
  function updateFormSteps() {
    steps.forEach((step, index) => {
      step.style.display = index === currentStep ? "block" : "none";
    });
    updateProgressBar();
  }

  // Update progress bar
  function updateProgressBar() {
    const progressSteps = document.querySelectorAll(".progressstep");
    progressSteps.forEach((step, index) => {
      if (index <= currentStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
    const progressPercentage = (currentStep / (steps.length - 1)) * 100;
    progress.style.width = `${progressPercentage}%`;
  }

  // Validate fields in the current step
  function validateFields() {
    const inputs = steps[currentStep].querySelectorAll("input, select");
    for (let input of inputs) {
      if (input.name === "contact") {
        if (!/^\d{10,}$/.test(input.value)) {
          alert("Phone number must be at least 10 digits and contain only numbers.");
          input.focus();
          return false;
        }
      }
      if (input.name === "email") {
        if (!/@/.test(input.value)) {
          alert("Email must contain the '@' symbol.");
          input.focus();
          return false;
        }
      }
      if (input.name === "radio" && !steps[currentStep].querySelector('input[name="radio"]:checked')) {
        alert("Please select Delivery or Pickup.");
        return false;
      }
      if (input.name === "postcode") {
        if (!/^\d{5}$/.test(input.value)) {
          alert("Postcode must be exactly 5 digits and contain only numbers.");
          input.focus();
          return false;
        }
      }
      if (!input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  }

  // Validate payment fields on submit
  function validatePaymentFields() {
    const cardNumber = document.getElementById("num");
    const expDate = document.getElementById("exp");
    const cvv = document.getElementById("cvv");
    const cashOption = document.getElementById("Cash");
    const cardOption = document.getElementById("Debit Card");

    if (!cashOption.checked && !cardOption.checked) {
      alert("Please select a payment method.");
      return false;
    }

    if (cardOption.checked) {
      // Validate card details only if "Debit Card" is selected
      if (!/^\d+$/.test(cardNumber.value)) {
        alert("Card number must contain only digits.");
        cardNumber.focus();
        return false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate.value)) {
        alert("Expiration date must be in the format MM/YY.");
        expDate.focus();
        return false;
      }
      if (!/^\d{3}$/.test(cvv.value)) {
        alert("CVV must be exactly 3 digits.");
        cvv.focus();
        return false;
      }
    }

    // If "Cash" is selected, skip card validation
    return true;
  }

  // Event listeners for Next buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (validateFields()) {
        currentStep++;
        updateFormSteps();
      }
    });
  });

  // Event listeners for Previous buttons
  prevButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      currentStep--;
      updateFormSteps();
    });
  });

  // Event listener for Submit button
  submitButton.addEventListener("click", (e) => {
    if (!validatePaymentFields()) {
      e.preventDefault();
    }
  });

  // Initial setup
  updateFormSteps();
});

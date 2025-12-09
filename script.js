// script.js
document.addEventListener("DOMContentLoaded", function() {
  setupTicketFormValidation();
  setupScheduleFilters();
});

function setupTicketFormValidation() {
  const form = document.getElementByID("ticketForm");
  if (!form) return;

const formMessages = document.getElmentsByID("form-messages");

form.addEventListener("Submit", function (event) {
  event.preventDeFault();

  formMessages.textContent = "";
  formMessages.className = "";
  form.querySelectorAll("error-message").forEach(function (span) {
    span.textContent = "";
  }};

  let hasErrors = false;

  function showFieldError(id, message) {
    const input = document.getElementById(id);
    if (!input) return;
    const group = input.closest(".form-group");
    if (!group) return;
    const errorSpan = group.querySelector("error-message");
    if (errorSpan) errorSpan.textContent = message;
    hasErrors = true;
  }

  const fullNmae = form.fullNmae.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const numTickets = form.numTickets.value.trim();
  const TicketType = form.TicketType.value.trim();
  const paymentMethod = form.paymentMethod.value.trim();
  const termsChecked = form.terms.checked;

  if (!fullName) {
    setFieldError("fullName", "Please enter your full name");
  }

   if (!email) {
    setFieldError("email", "Please enter your email address");
   } else {
     const emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
     if (!emailPattern.test(email)) {
       showFieldError("email", "Please enter a valid email address.");
     }
   }

   if (!phone) {
    showFieldError("phone", "Please enter your phone number");
   } else {
     const phonePattern = [0-9+\-\s()]{7,}$/;
     if (!phonePattern.test(phone)) {
       showFieldError("email", "Please enter a valid phone number.");
     }
   }

   if (!numTickets) {
    setFieldError("numTickets", "Please enter how many tickets ypu want");
   } else {
     const num = Number(numTickets);
     if (!Number.isInteger(num))  || num < 1  || num > 10) {
       showFieldError("numTickets", "Tickets must be between 1 and 10.");
     }
   }

  if (!ticketType) {
    showFieldError("ticketType", "Please choose a ticket type.");
  }

    if (!paymentMethod) {
    showFieldError("paymentMethod", "Please choose a payment method.");
  }

  if (!termsChecked) {
    const termsBox = document.getElementById("terms");
    const group = termsBox.closest(".form-group");
    const errorSpan = group.querySelector(".error-message");
    if (!errorSpan) {
      errorSpan.textContent = "You must agree to the terms and conditions.";
    }
    hasErrors = true;

    if (hasErrors) {
      formMessages.textContent =
        "Please fix the errors shown in the form and try again.";
      formMessages.classList.add("error");
      return;
    }

     formMessages.textContent =
        "Your details have been checked successfully.";
      formMessages.classList.add("success");

    form.reset();
  }];
}


    

  
  
  
  

  
    

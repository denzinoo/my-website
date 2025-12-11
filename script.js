// script.js
document.addEventListener("DOMContentLoaded", function() {
  setupTicketFormValidation();
  setupScheduleFilters();
});

function setupTicketFormValidation() {
  const form = document.getElementById("ticketForm");
  if (!form) return;

  const formMessages = document.getElementById("form-messages");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Clear previous messages
    formMessages.textContent = "";
    formMessages.className = "";
    
    // Clear all error messages
    form.querySelectorAll(".error-message").forEach(function(span) {
      span.textContent = "";
    });

    let hasErrors = false;

    // Helper function to show field errors
    function showFieldError(id, message) {
      const input = document.getElementById(id);
      if (!input) return;
      const group = input.closest(".form-group");
      if (!group) return;
      const errorSpan = group.querySelector(".error-message");
      if (errorSpan) errorSpan.textContent = message;
      hasErrors = true;
    }

    // Get form values
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const numTickets = form.numTickets.value.trim();
    const ticketType = form.ticketType.value.trim();
    const paymentMethod = form.paymentMethod.value.trim();
    const termsChecked = form.terms.checked;

    // Validate full name
    if (!fullName) {
      showFieldError("fullName", "Please enter your full name");
    }

    // Validate email
    if (!email) {
      showFieldError("email", "Please enter your email address");
    } else {
      const emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
      if (!emailPattern.test(email)) {
        showFieldError("email", "Please enter a valid email address.");
      }
    }

    // Validate phone
    if (!phone) {
      showFieldError("phone", "Please enter your phone number");
    } else {
      const phonePattern = /^[0-9+\-\s()]{7,}$/;
      if (!phonePattern.test(phone)) {
        showFieldError("phone", "Please enter a valid phone number.");
      }
    }

    // Validate number of tickets
    if (!numTickets) {
      showFieldError("numTickets", "Please enter how many tickets you want");
    } else {
      const num = Number(numTickets);
      if (!Number.isInteger(num) || num < 1 || num > 10) {
        showFieldError("numTickets", "Tickets must be between 1 and 10.");
      }
    }

    // Validate ticket type
    if (!ticketType) {
      showFieldError("ticketType", "Please choose a ticket type.");
    }

    // Validate payment method
    if (!paymentMethod) {
      showFieldError("paymentMethod", "Please choose a payment method.");
    }

    // Validate terms checkbox
    if (!termsChecked) {
      const termsBox = document.getElementById("terms");
      const group = termsBox.closest(".form-group");
      const errorSpan = group.querySelector(".error-message");
      if (errorSpan) {
        errorSpan.textContent = "You must agree to the terms and conditions.";
      }
      hasErrors = true;
    }

    // If there are errors, show error message and stop
    if (hasErrors) {
      formMessages.textContent = "Please fix the errors shown in the form and try again.";
      formMessages.className = "error";
      formMessages.style.display = "block";
      // Scroll to the message
      formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // Success - show success message
    formMessages.textContent = "✓ Success! Your ticket reservation has been submitted successfully.";
    formMessages.className = "success";
    formMessages.style.display = "block";
    
    // Scroll to the message
    formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Reset form after 2 seconds
    setTimeout(function() {
      form.reset();
      // Hide message after reset
      setTimeout(function() {
        formMessages.style.display = "none";
      }, 3000);
    }, 2000);
  });
}

function setupScheduleFilters() {
  // Add your schedule filter functionality here if needed
  console.log("Schedule filters initialized");
}

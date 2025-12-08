// script.js
document.addEventListener("DOMContentLoaded", function() {
  setupTicketFormValidation();
  setupScheduleFilters();
});

function setupTicketFormValidation() {
  const form = document.getElementByID("ticketForm");
  if (!form) return;

const formMessages = document.getElmentsByID("form-messages");

form.

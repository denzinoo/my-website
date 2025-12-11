// script.js - Complete MusicFest 2025 Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  setupTicketFormValidation();
  setupScheduleFilters();
  setupSmoothScrolling();
  setupMobileNavigation();
});

// ===================================
// TICKET FORM VALIDATION
// ===================================
function setupTicketFormValidation() {
  const form = document.getElementById("ticketForm");
  if (!form) return; // Exit if form doesn't exist on this page

  const formMessages = document.getElementById("form-messages");

  // Form submission handler
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Clear previous messages
    if (formMessages) {
      formMessages.textContent = "";
      formMessages.className = "";
      formMessages.style.display = "none";
    }
    
    // Clear all error messages
    form.querySelectorAll(".error-message").forEach(function(span) {
      span.textContent = "";
    });

    // Reset field borders
    form.querySelectorAll("input, select, textarea").forEach(function(field) {
      field.style.borderColor = "#fde68a";
    });

    let hasErrors = false;

    // Helper function to show field errors
    function showFieldError(id, message) {
      const input = document.getElementById(id);
      if (!input) return;
      const group = input.closest(".form-group");
      if (!group) return;
      const errorSpan = group.querySelector(".error-message");
      if (errorSpan) {
        errorSpan.textContent = message;
      }
      input.style.borderColor = "#dc2626";
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
    } else if (fullName.length < 2) {
      showFieldError("fullName", "Name must be at least 2 characters long");
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      showFieldError("fullName", "Name can only contain letters and spaces");
    }

    // Validate email
    if (!email) {
      showFieldError("email", "Please enter your email address");
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        showFieldError("email", "Please enter a valid email address (e.g., example@email.com)");
      }
    }

    // Validate phone
    if (!phone) {
      showFieldError("phone", "Please enter your phone number");
    } else {
      const phonePattern = /^[0-9+\-\s()]{10,}$/;
      if (!phonePattern.test(phone)) {
        showFieldError("phone", "Please enter a valid phone number (minimum 10 digits)");
      }
    }

    // Validate number of tickets
    if (!numTickets) {
      showFieldError("numTickets", "Please enter how many tickets you want");
    } else {
      const num = Number(numTickets);
      if (!Number.isInteger(num) || num < 1 || num > 10) {
        showFieldError("numTickets", "Number of tickets must be between 1 and 10");
      }
    }

    // Validate ticket type
    if (!ticketType) {
      showFieldError("ticketType", "Please choose a ticket type");
    }

    // Validate payment method
    if (!paymentMethod) {
      showFieldError("paymentMethod", "Please choose a payment method");
    }

    // Validate terms checkbox
    if (!termsChecked) {
      const termsBox = document.getElementById("terms");
      if (termsBox) {
        const group = termsBox.closest(".form-group");
        if (group) {
          const errorSpan = group.querySelector(".error-message");
          if (errorSpan) {
            errorSpan.textContent = "You must agree to the terms and conditions";
          }
        }
      }
      hasErrors = true;
    }

    // If there are errors, show error message and stop
    if (hasErrors) {
      if (formMessages) {
        formMessages.textContent = "❌ Please fix the errors shown in the form and try again.";
        formMessages.className = "error";
        formMessages.style.display = "block";
        // Scroll to the message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }

    // Success - show success message
    if (formMessages) {
      formMessages.textContent = "✓ Success! Your ticket reservation has been submitted successfully. We'll contact you shortly.";
      formMessages.className = "success";
      formMessages.style.display = "block";
      
      // Scroll to the message
      formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Reset form after 2 seconds
    setTimeout(function() {
      form.reset();
      // Clear all styling
      form.querySelectorAll("input, select, textarea").forEach(function(field) {
        field.style.borderColor = "#fde68a";
      });
      // Hide message after another 3 seconds
      setTimeout(function() {
        if (formMessages) {
          formMessages.style.display = "none";
        }
      }, 3000);
    }, 2000);
  });

  // Reset button handler
  form.addEventListener("reset", function() {
    // Clear all error messages
    form.querySelectorAll(".error-message").forEach(function(span) {
      span.textContent = "";
    });
    
    // Reset field borders
    form.querySelectorAll("input, select, textarea").forEach(function(field) {
      field.style.borderColor = "#fde68a";
    });
    
    // Hide form messages
    if (formMessages) {
      formMessages.style.display = "none";
      formMessages.className = "";
    }
  });

  // Real-time validation on blur (when user leaves a field)
  const fieldsToValidate = ['fullName', 'email', 'phone', 'numTickets'];
  fieldsToValidate.forEach(function(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('blur', function() {
        const group = this.closest('.form-group');
        if (group && this.value.trim() !== '') {
          const errorSpan = group.querySelector('.error-message');
          if (errorSpan && errorSpan.textContent) {
            // Clear error if field has value
            errorSpan.textContent = '';
            this.style.borderColor = '#fde68a';
          }
        }
      });
    }
  });
}

// ===================================
// SCHEDULE FILTERS
// ===================================
function setupScheduleFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const scheduleRows = document.querySelectorAll('tbody tr');
  
  if (filterButtons.length === 0 || scheduleRows.length === 0) return; // Exit if elements don't exist

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter rows
      scheduleRows.forEach(function(row) {
        if (filterValue === 'all') {
          row.style.display = '';
          // Add fade-in animation
          row.style.animation = 'fadeIn 0.5s ease';
        } else {
          const rowDay = row.getAttribute('data-day');
          if (rowDay === filterValue) {
            row.style.display = '';
            row.style.animation = 'fadeIn 0.5s ease';
          } else {
            row.style.display = 'none';
          }
        }
      });
    });
  });
}

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal anchor links
      if (href && href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ===================================
// MOBILE NAVIGATION TOGGLE
// ===================================
function setupMobileNavigation() {
  // This is a placeholder for mobile menu functionality
  // You can expand this if you add a hamburger menu later
  
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  // Add active class to current page link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = nav.querySelectorAll('a');
  
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Add animation when elements come into view
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with animation class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Call scroll animations if needed
if (document.querySelector('.animate-on-scroll')) {
  addScrollAnimations();
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('🎵 MusicFest 2025 - Website loaded successfully! 🎉');

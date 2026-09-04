/* ============================================
   CONTACT FORM VALIDATION & SUBMISSION
   ============================================ */
(function () {
  const form       = document.getElementById('contact-form');
  const nameInput  = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const msgInput   = document.getElementById('contact-message');
  const submitBtn  = document.getElementById('contact-submit');
  const submitText = document.getElementById('submit-text');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  function showError(inputEl, errorId, message) {
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = message;
    inputEl.classList.add('error');
  }

  function clearError(inputEl, errorId) {
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.textContent = '';
    inputEl.classList.remove('error');
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Live validation
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) clearError(nameInput, 'name-error');
  });

  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value.trim())) clearError(emailInput, 'email-error');
  });

  msgInput.addEventListener('input', () => {
    if (msgInput.value.trim().length >= 10) clearError(msgInput, 'message-error');
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'name-error', 'Please enter your name (at least 2 characters).');
      valid = false;
    } else {
      clearError(nameInput, 'name-error');
    }

    // Validate email
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailInput, 'email-error');
    }

    // Validate message
    if (msgInput.value.trim().length < 10) {
      showError(msgInput, 'message-error', 'Message must be at least 10 characters.');
      valid = false;
    } else {
      clearError(msgInput, 'message-error');
    }

    if (!valid) return;

    // Simulate send (replace with your actual API call)
    submitBtn.classList.add('loading');
    if (submitText) submitText.textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      if (submitText) submitText.textContent = 'Send Message';

      // Show success
      if (successMsg) successMsg.classList.add('show');
      form.reset();

      // Hide success after 5s
      setTimeout(() => {
        if (successMsg) successMsg.classList.remove('show');
      }, 5000);
    }, 1800);
  });
})();

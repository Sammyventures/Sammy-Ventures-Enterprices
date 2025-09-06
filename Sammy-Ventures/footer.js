document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");
  if (!form) {
    console.error("Newsletter form not found: make sure the form has class 'newsletter-form'");
    return;
  }

  const input = form.querySelector("input[type='email']");
  if (!input) {
    console.error("Email input not found inside .newsletter-form");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = input.value.trim();

    // HTML5 validity check
    if (!input.checkValidity()) {
      // will show browser-native message on some browsers; fallback to alert
      alert("⚠ Please enter a valid email address.");
      input.focus();
      return;
    }

    // Success
    alert("🎉 You have successfully subscribed with: " + email);
    form.reset();
  });

  // Extra safety: if your submit button is not type="submit", handle its click
  const submitBtn = form.querySelector("button[type='button'], input[type='button']");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => form.dispatchEvent(new Event('submit', { cancelable: true })));
  }

  console.log("Newsletter script loaded — form listeners active.");
});
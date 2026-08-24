document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#quote-form");
  const status = document.querySelector("#quote-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    status.className = "form-status show";
    status.textContent = "Sending your request...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/christopher@localshineservices.com", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form service did not accept the request.");
      form.reset();
      status.className = "form-status show ok";
      status.textContent = "Got it. I'll look at the address and text you back - usually same day, always within 24 hours.";
    } catch (error) {
      status.className = "form-status show err";
      status.textContent = "Something blocked the form. Text 786-505-1641 with the address and photos, and I'll answer there fastest.";
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });
});

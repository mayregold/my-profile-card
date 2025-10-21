document.addEventListener("DOMContentLoaded", () => {
  const followBtn = document.getElementById("btn-follow");
  const messageBtn = document.getElementById("btn-message");
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const menuToggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menuList");
  const timeDisplay = document.getElementById("current-time");
  const contactForm = document.getElementById("contact-form");

  let isFollowing = false;

  if (followBtn) {
    followBtn.addEventListener("click", () => {
      isFollowing = !isFollowing;
      followBtn.textContent = isFollowing ? "Following" : "Follow";
      followBtn.setAttribute("aria-pressed", isFollowing.toString());
    });
  }

  if (messageBtn) {
    messageBtn.addEventListener("click", () => {
      alert("Message feature coming soon!");
    });
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) body.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }


  if (timeDisplay) {
    function updateTime() {
      const now = new Date();
      timeDisplay.textContent = now.toLocaleTimeString();
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // CONTACT FORM VALIDATION
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("contact-name");
      const email = document.getElementById("contact-email");
      const subject = document.getElementById("contact-subject");
      const message = document.getElementById("contact-message");
      const successMessage = document.getElementById("contact-success");

      let isValid = true;

      document.querySelectorAll(".error-message").forEach(msg => msg.textContent = "");
      successMessage.hidden = true;

      if (!name.value.trim()) {
        document.getElementById("error-name").textContent = "Full name is required.";
        isValid = false;
      }

      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!email.value.trim()) {
        document.getElementById("error-email").textContent = "Email is required.";
        isValid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        document.getElementById("error-email").textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (!subject.value.trim()) {
        document.getElementById("error-subject").textContent = "Subject is required.";
        isValid = false;
      }

      if (!message.value.trim()) {
        document.getElementById("error-message").textContent = "Message is required.";
        isValid = false;
      } else if (message.value.trim().length < 10) {
        document.getElementById("error-message").textContent = "Message must be at least 10 characters.";
        isValid = false;
      }

      if (isValid) {
        successMessage.hidden = false;
        contactForm.reset();
      }
    });
  }
});
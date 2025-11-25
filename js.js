      // Navigation
      function navigateTo(page) {
        // Hide all pages
        const pages = document.querySelectorAll(".page");
        pages.forEach((p) => p.classList.remove("active"));

        // Show selected page
        document.getElementById(page).classList.add("active");

        // Update nav links
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => link.classList.remove("active"));

        const linkMap = {
          home: 0,
          services: 1,
          contact: 2,
        };
        navLinks[linkMap[page]].classList.add("active");

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Form submission
      function handleSubmit(event) {
        event.preventDefault();

        const form = document.getElementById("contactForm");
        const successMessage = document.getElementById("successMessage");

        // Hide form and show success message
        form.style.display = "none";
        successMessage.classList.add("active");

        // Reset after 3 seconds
        setTimeout(() => {
          form.style.display = "block";
          form.reset();
          successMessage.classList.remove("active");
        }, 3000);
      }

      // Smooth scroll animation on load
      window.addEventListener("load", () => {
        document.body.style.opacity = "1";
      });

      // Add hover effects to cards
      document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(
          ".glass-card, .service-card, .news-card, .value-card"
        );

        cards.forEach((card) => {
          card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px) scale(1.02)";
          });

          card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
          });
        });
      });
// Portal Glow Navigation — split JS
(function() {
  const cards = document.querySelectorAll('.card');
  const portal = document.getElementById('portal');
  const sections = document.querySelectorAll('.section');
  const backButtons = document.querySelectorAll('.back-btn');

  let busy = false; // prevent double taps during animation

  function openSection(sectionId, color, originX, originY) {
    if (busy) return;
    busy = true;

    // Position the portal at the click origin
    portal.style.setProperty('--portal-color', color);
    portal.style.left = originX + 'px';
    portal.style.top = originY + 'px';
    portal.style.width = '0px';
    portal.style.height = '0px';

    // Force a reflow so the browser registers the 0 size before expanding
    void portal.offsetWidth;

    // Compute the required diameter to cover the viewport from the origin
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dx = Math.max(originX, vw - originX);
    const dy = Math.max(originY, vh - originY);
    const diameter = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 2);

    portal.style.width = diameter + 'px';
    portal.style.height = diameter + 'px';

    // After the portal expansion, reveal the section
    setTimeout(() => {
      sections.forEach(s => {
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
      });
      const target = document.getElementById(sectionId);
      target.classList.add('active');
      target.setAttribute('aria-hidden', 'false');
      busy = false;
    }, 720);
  }

  function closeToHome(color, originX, originY) {
    if (busy) return;
    busy = true;

    // Start with portal big enough to cover screen, then shrink to origin
    portal.style.setProperty('--portal-color', color);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const centerX = Math.round(vw / 2);
    const centerY = Math.round(vh / 2);
    const dx = Math.max(centerX, vw - centerX);
    const dy = Math.max(centerY, vh - centerY);
    const diameter = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 2);

    // Set to full first (ensures we animate from big to small)
    portal.style.left = centerX + 'px';
    portal.style.top = centerY + 'px';
    portal.style.width = diameter + 'px';
    portal.style.height = diameter + 'px';
    void portal.offsetWidth; // reflow

    // Now move the portal to the origin and shrink to 0
    portal.style.left = originX + 'px';
    portal.style.top = originY + 'px';
    portal.style.width = '0px';
    portal.style.height = '0px';

    setTimeout(() => {
      sections.forEach(s => {
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
      });
      busy = false;
    }, 720);
  }

  // Card click -> open section
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const sectionId = card.getAttribute('data-section');
      const color = card.getAttribute('data-color');
      const rect = card.getBoundingClientRect();
      const originX = Math.round(rect.left + rect.width / 2);
      const originY = Math.round(rect.top + rect.height / 2);
      openSection(sectionId, color, originX, originY);
    }, { passive: true });
  });

  // Back button -> return home
  backButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = e.currentTarget.closest('.section');
      const color = section.getAttribute('data-color');
      const rect = e.currentTarget.getBoundingClientRect();
      const originX = Math.round(rect.left + rect.width / 2);
      const originY = Math.round(rect.top + rect.height / 2);
      closeToHome(color, originX, originY);
    });
  });

  // Ensure sections don't block clicks when inactive
  sections.forEach(s => {
    s.addEventListener('transitionend', () => {
      if (!s.classList.contains('active')) {
        s.setAttribute('aria-hidden', 'true');
      }
    });
  });
})();







// Cart functionality
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-msg");
  const cartIcon = document.getElementById("cart-icon");
  const cartDropdown = document.getElementById("cart-dropdown");
  let count = 0;

  // Add event listeners to all "add to cart" buttons
  document.querySelectorAll(".watch-hovercontainer").forEach(container => {
    const button = container.querySelector(".addto");
    const productName = container.querySelector(".thermo").textContent;

    button.addEventListener("click", () => {
      count++;
      cartCount.textContent = count;
      emptyMsg.style.display = "none";

      const li = document.createElement("li");
      li.textContent = productName;
      cartItems.appendChild(li);

      alert(`${productName} has been added to your cart!`);
    });
  });

  // Toggle dropdown on cart icon click
  cartIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click event from propagating to document
    cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
      cartDropdown.style.display = "none";
    }
  });
});





document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});




const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");
const cards = document.querySelectorAll(".testimonial-card");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

let index = 0;
const cardWidth = 330; // card width + gap

// Create dots
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dots span");

// Functions
function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function goToSlide(i) {
  index = i;
  slider.scrollTo({
    left: i * cardWidth,
    behavior: "smooth"
  });
  updateDots();
}

function nextSlide() {
  index = (index + 1) % cards.length;
  goToSlide(index);
}

function prevSlide() {
  index = (index - 1 + cards.length) % cards.length;
  goToSlide(index);
}

// Arrows
rightArrow.addEventListener("click", nextSlide);
leftArrow.addEventListener("click", prevSlide);

// Auto-scroll
let autoPlay = setInterval(nextSlide, 2000);

// Pause on hover
slider.addEventListener("mouseenter", () => clearInterval(autoPlay));
slider.addEventListener("mouseleave", () => autoPlay = setInterval(nextSlide, 4000));


// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");

  if (!form) return; // Safety check in case the form doesn't exist

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual form submission

    const emailInput = form.querySelector("input[type='email']");
    const email = emailInput?.value.trim();

    if (email) {
      alert(`🎉 You have successfully subscribed with: ${email}`);
      form.reset(); // Clear the input after subscribing
    } else {
      alert("⚠ Please enter a valid email before subscribing.");
      emailInput?.focus(); // Optional: focus the input for user convenience
    }
  });
});

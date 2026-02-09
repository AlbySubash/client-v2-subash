/**
 * TARA NATURAL FOODS - V2 (Light, Clean)
 * Small, clean JS: sticky header, mobile nav, counters, newsletter demo validation
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");

  // Sticky header shadow on scroll
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu toggle
  const closeNav = () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  const openNav = () => {
    nav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    if (isOpen) closeNav();
    else openNav();
  });

  // Close nav when clicking a link (mobile)
  nav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => closeNav());
  });

  // Close nav on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Close nav if clicking outside (mobile)
  document.addEventListener("click", (e) => {
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    if (!isMobile) return;

    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });

  // Counter animation (About stats)
  const stats = document.querySelectorAll(".stat-num[data-count]");
  if (stats.length) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateNumber = (el, target) => {
      if (prefersReduced) {
        el.textContent = target.toLocaleString();
        return;
      }

      const duration = 1200;
      const start = 0;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(start + (target - start) * progress);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count || "0");
        animateNumber(el, target);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });

    stats.forEach(el => io.observe(el));
  }

  // Newsletter demo validation
  const form = document.getElementById("newsletterForm");
  const msg = document.getElementById("formMsg");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (form && msg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      msg.textContent = "";

      const firstName = form.firstName.value.trim();
      const lastName = form.lastName.value.trim();
      const email = form.email.value.trim();

      if (!firstName || !lastName || !email) {
        msg.textContent = "Please fill in all fields.";
        return;
      }
      if (!isValidEmail(email)) {
        msg.textContent = "Please enter a valid email address.";
        return;
      }

      msg.textContent = `Thanks, ${firstName}! (Demo) You’re subscribed.`;
      form.reset();
    });
  }
});

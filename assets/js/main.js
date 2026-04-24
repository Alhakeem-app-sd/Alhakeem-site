/* ============================================================
   AL-HAKEEM — Page interactions
   - Scroll-elevated header
   - Reveal-on-scroll (IntersectionObserver)
   - Notify form (email validation, success state)
   ============================================================ */
(function () {
  "use strict";

  /* ---- Scroll-elevated header ---- */
  var header = document.querySelector("[data-scroll-elevate]");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- Notify forms ---- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var forms = document.querySelectorAll("[data-notify-form]");

  forms.forEach(function (form) {
    var input = form.querySelector("input[type=email]");
    var msg = form.parentElement
      ? form.parentElement.querySelector("[data-notify-msg]")
      : null;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input || !msg) return;

      var value = (input.value || "").trim();
      var locale = document.documentElement.getAttribute("lang") || "ar";
      var i18n = window.AlHakeemI18n;

      var ok = EMAIL_RE.test(value);
      msg.classList.remove("notify-form__msg--success", "notify-form__msg--error");

      if (!ok) {
        msg.classList.add("notify-form__msg--error");
        msg.textContent =
          locale === "ar"
            ? "يرجى إدخال بريد إلكتروني صحيح."
            : "Please enter a valid email address.";
        input.focus();
        return;
      }

      msg.classList.add("notify-form__msg--success");
      msg.textContent =
        locale === "ar"
          ? "✓ شكراً لك. سنخبرك فور إطلاق المنصّة."
          : "✓ Thank you. We'll be in touch the moment we launch.";
      input.value = "";
      input.blur();

      // Stash locally so we can show "already subscribed" later if desired
      try {
        localStorage.setItem("alhakeem.notify", value);
      } catch (e) {
        /* ignore */
      }
    });
  });
})();

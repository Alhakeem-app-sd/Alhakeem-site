/* ============================================================
   AL-HAKEEM — Lightweight i18n + locale switcher
   - Every translatable node has data-i18n="section.key"
   - <html lang/dir> updated on locale change
   - Locale persisted in localStorage
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "alhakeem.locale";
  var DEFAULT_LOCALE = "ar";

  var messages = {
    ar: {
      header: {
        logoAlt: "الحكيم",
        doctorLogin: "دخول الأطباء",
      },
      lang: {
        label: "اللغة",
        name: "العربية",
        switchToLabel: "Language",
        switchToName: "English",
      },
      hero: {
        badge: "قريباً · الإصدار الأول",
        titleLead: "الرعاية الطبية",
        titleAccent: "الموثوقة",
        titleTrail: "، تبدأ من هنا.",
        title: "الرعاية الطبية الموثوقة، تبدأ من هنا.",
        subtitle:
          "منصّة الحكيم تجمع أمهر الأطباء السودانيين في مكان واحد لتقديم استشارات طبية آمنة وعالية الجودة، بكل خصوصية وسهولة.",
        loginCta: "تسجيل الدخول",
        notifyPlaceholder: "بريدك الإلكتروني",
        notifyCta: "أعلِمني عند الإطلاق",
        notifySuccess: "✓ شكراً لك. سنخبرك فور إطلاق المنصّة.",
        notifyError: "يرجى إدخال بريد إلكتروني صحيح.",
      },
      trust: {
        secure: "تشفير من طرف لطرف",
        verified: "أطباء معتمدون",
        available: "متاح 24/7",
      },
      features: {
        eyebrow: "لماذا الحكيم؟",
        title: "تجربة طبية مصمّمة لك",
        item1Title: "أطباء متخصصون",
        item1Desc: "جميع الأطباء يمرّون بعملية تحقّق دقيقة لضمان الكفاءة والخبرة.",
        item2Title: "خصوصية وأمان",
        item2Desc: "بياناتك ومحادثاتك محميّة بأعلى معايير الأمان والتشفير.",
        item3Title: "استشارة في أي وقت",
        item3Desc: "احجز موعدك بسهولة، أو احصل على استشارة فورية متى احتجت.",
      },
      stats: {
        item1Value: "+٢٠٠",
        item1Label: "طبيب متخصص",
        item2Value: "+١٥",
        item2Label: "تخصّص طبي",
        item3Value: "٢٤/٧",
        item3Label: "دعم على مدار الساعة",
        item4Value: "AES-256",
        item4Label: "تشفير على مستوى البنوك",
      },
      preview: {
        doctorName: "د. سارة عبد الله",
        doctorSpec: "طب باطني · استشارية",
        rating: "٤٫٩",
        reviews: "(١٢٤ تقييم)",
        statusLive: "متاحة الآن",
        cta: "حجز استشارة",
      },
      ctaBand: {
        eyebrow: "كن أول من يعلم",
        title: "نحن نقترب من الإطلاق.",
        subtitle: "اشترك لتصلك دعوة مبكّرة وآخر التحديثات.",
      },
      steps: {
        eyebrow: "كيف يعمل",
        title: "ثلاث خطوات بسيطة فقط",
        s1Title: "أنشئ حسابك",
        s1Desc: "سجّل في دقائق ببريدك الإلكتروني — بدون تعقيد.",
        s2Title: "اختر الطبيب",
        s2Desc: "تصفّح أطباء معتمدين في كل التخصّصات واختر من يناسبك.",
        s3Title: "ابدأ استشارتك",
        s3Desc: "احجز موعداً أو ابدأ مكالمة فيديو/صوت آمنة فوراً.",
      },
      footerNav: {
        product: "المنصّة",
        productOverview: "نظرة عامة",
        productDoctors: "للأطباء",
        productPatients: "للمرضى",
        company: "الشركة",
        companyAbout: "من نحن",
        companyContact: "تواصل معنا",
        companyBlog: "المدوّنة",
        legal: "قانوني",
        tagline: "منصّة سودانية رائدة لتقديم الاستشارات الطبية بجودة عالمية وخصوصية مطلقة.",
        live: "الموقع يعمل بشكل طبيعي",
      },
      footer: {
        privacy: "سياسة الخصوصية",
        terms: "الشروط والأحكام",
        copyright: "© ٢٠٢٦ منصّة الحكيم. جميع الحقوق محفوظة.",
      },
      privacy: {
        eyebrow: "الوثائق القانونية",
        title: "سياسة الخصوصية",
        updated: "آخر تحديث: أبريل ٢٠٢٦ · الإصدار 1.0",
        back: "← العودة إلى الرئيسية",
      },
      terms: {
        eyebrow: "الوثائق القانونية",
        title: "الشروط والأحكام العامة",
        updated: "آخر تحديث: أبريل ٢٠٢٦ · الإصدار 1.0",
        back: "← العودة إلى الرئيسية",
      },
    },
    en: {
      header: {
        logoAlt: "Al-Hakeem",
        doctorLogin: "Doctor sign-in",
      },
      lang: {
        label: "Language",
        name: "English",
        switchToLabel: "اللغة",
        switchToName: "العربية",
      },
      hero: {
        badge: "Coming Soon · v1",
        titleLead: "Trusted medical care,",
        titleAccent: "starts here",
        titleTrail: ".",
        title: "Trusted medical care, starts here.",
        subtitle:
          "Al-Hakeem brings together top Sudanese doctors in one place to deliver safe, high-quality consultations — privately and effortlessly.",
        loginCta: "Sign in",
        notifyPlaceholder: "Your email address",
        notifyCta: "Notify me at launch",
        notifySuccess: "✓ Thank you. We'll be in touch the moment we launch.",
        notifyError: "Please enter a valid email address.",
      },
      trust: {
        secure: "End-to-end encryption",
        verified: "Verified doctors",
        available: "Available 24/7",
      },
      features: {
        eyebrow: "Why Al-Hakeem?",
        title: "A medical experience designed for you",
        item1Title: "Specialist doctors",
        item1Desc: "Every doctor goes through a thorough verification process to ensure expertise and quality.",
        item2Title: "Privacy & security",
        item2Desc: "Your data and conversations are protected with the highest security and encryption standards.",
        item3Title: "Care, anytime",
        item3Desc: "Book an appointment with ease, or get an instant consultation whenever you need it.",
      },
      stats: {
        item1Value: "200+",
        item1Label: "Verified specialists",
        item2Value: "15+",
        item2Label: "Medical specialties",
        item3Value: "24/7",
        item3Label: "Round-the-clock support",
        item4Value: "AES-256",
        item4Label: "Bank-grade encryption",
      },
      preview: {
        doctorName: "Dr. Sarah Abdullah",
        doctorSpec: "Internal Medicine · Consultant",
        rating: "4.9",
        reviews: "(124 reviews)",
        statusLive: "Available now",
        cta: "Book consultation",
      },
      ctaBand: {
        eyebrow: "Be the first to know",
        title: "We're getting close to launch.",
        subtitle: "Sign up for early access and product updates.",
      },
      steps: {
        eyebrow: "How it works",
        title: "Three simple steps",
        s1Title: "Create your account",
        s1Desc: "Sign up with your email in minutes — no complexity.",
        s2Title: "Choose a doctor",
        s2Desc: "Browse verified specialists across every discipline and pick the right fit.",
        s3Title: "Start your visit",
        s3Desc: "Book an appointment or start a secure video/audio call instantly.",
      },
      footerNav: {
        product: "Product",
        productOverview: "Overview",
        productDoctors: "For doctors",
        productPatients: "For patients",
        company: "Company",
        companyAbout: "About",
        companyContact: "Contact",
        companyBlog: "Blog",
        legal: "Legal",
        tagline: "A leading Sudanese platform delivering world-class medical consultations with absolute privacy.",
        live: "All systems operational",
      },
      footer: {
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        copyright: "© 2026 Al-Hakeem Platform. All rights reserved.",
      },
      privacy: {
        eyebrow: "Legal documents",
        title: "Privacy Policy",
        updated: "Last updated: April 2026 · Version 1.0",
        back: "← Back to home",
      },
      terms: {
        eyebrow: "Legal documents",
        title: "General Terms & Conditions",
        updated: "Last updated: April 2026 · Version 1.0",
        back: "← Back to home",
      },
    },
  };

  function getStoredLocale() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") return stored;
    } catch (e) {
      /* localStorage may be blocked */
    }
    return DEFAULT_LOCALE;
  }

  function storeLocale(locale) {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {
      /* ignore */
    }
  }

  function resolveKey(locale, key) {
    var parts = key.split(".");
    var node = messages[locale];
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return "";
      node = node[parts[i]];
    }
    return typeof node === "string" ? node : "";
  }

  function applyLocale(locale) {
    var html = document.documentElement;
    html.setAttribute("lang", locale);
    html.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");

    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = resolveKey(locale, key);
      if (!value) return;
      var attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        el.textContent = value;
      }
    });

    var flag = document.querySelector("[data-lang-flag]");
    if (flag) {
      flag.setAttribute(
        "src",
        locale === "ar"
          ? "assets/icons/flag-us.svg"
          : "assets/icons/flag-sudan.svg"
      );
    }
    var flagAlt = locale === "ar" ? "English" : "العربية";
    if (flag) flag.setAttribute("alt", flagAlt);

    var ev = new CustomEvent("localechange", { detail: { locale: locale } });
    document.dispatchEvent(ev);
  }

  function toggleLocale() {
    var current = document.documentElement.getAttribute("lang") || DEFAULT_LOCALE;
    var next = current === "ar" ? "en" : "ar";
    storeLocale(next);
    applyLocale(next);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLocale(getStoredLocale());

    var triggers = document.querySelectorAll("[data-lang-toggle]");
    triggers.forEach(function (btn) {
      btn.addEventListener("click", toggleLocale);
    });
  });

  window.AlHakeemI18n = { applyLocale: applyLocale, toggle: toggleLocale };
})();

// js/main.js
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.hasAttribute("hidden");
      if (isOpen) {
        mobileMenu.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileMenu.removeAttribute("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
      }
    });
  }

  // Signup behavior (front-end demo)
  const form = document.getElementById("signupForm");
  if (form) {
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const terms = document.getElementById("terms");
    const msg = document.getElementById("formMsg");
    const togglePw = document.getElementById("togglePw");
    const pwBar = document.getElementById("pwBar");
    const pwHint = document.getElementById("pwHint");

    function setMsg(text, type) {
      if (!msg) return;
      msg.textContent = text || "";
      msg.classList.remove("error", "ok");
      if (type) msg.classList.add(type);
    }

    function scorePassword(pw) {
      let score = 0;
      if (!pw) return 0;
      if (pw.length >= 8) score += 25;
      if (pw.length >= 12) score += 15;
      if (/[A-Z]/.test(pw)) score += 15;
      if (/[a-z]/.test(pw)) score += 15;
      if (/[0-9]/.test(pw)) score += 15;
      if (/[^A-Za-z0-9]/.test(pw)) score += 15;
      return Math.min(100, score);
    }

    function updateMeter() {
      const v = password?.value || "";
      const s = scorePassword(v);
      if (pwBar) pwBar.style.width = s + "%";
      if (pwHint) {
        if (s < 35) pwHint.textContent = "Weak: add numbers + more characters.";
        else if (s < 70) pwHint.textContent = "Good: add a symbol or uppercase for stronger security.";
        else pwHint.textContent = "Strong: nice password.";
      }
    }

    if (password) password.addEventListener("input", updateMeter);
    updateMeter();

    if (togglePw && password) {
      togglePw.addEventListener("click", () => {
        const isPw = password.type === "password";
        password.type = isPw ? "text" : "password";
        togglePw.textContent = isPw ? "Hide" : "Show";
        togglePw.setAttribute("aria-label", isPw ? "Hide password" : "Show password");
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      setMsg("", null);

      const nameVal = fullName?.value?.trim() || "";
      const emailVal = email?.value?.trim() || "";
      const pwVal = password?.value || "";
      const termsOk = !!terms?.checked;

      if (nameVal.length < 2) return setMsg("Please enter your full name.", "error");
      if (!/^\S+@\S+\.\S+$/.test(emailVal)) return setMsg("Please enter a valid email address.", "error");
      if (pwVal.length < 8) return setMsg("Password must be at least 8 characters.", "error");
      if (!termsOk) return setMsg("Please accept the Terms and Privacy to continue.", "error");

      // Store demo profile locally (replace with real API in production)
      const profile = {
        fullName: nameVal,
        email: emailVal,
        createdAt: new Date().toISOString()
      };
      try {
        localStorage.setItem("stream_demo_profile", JSON.stringify(profile));
      } catch {}

      setMsg("Account created (demo). Redirecting to registration steps…", "ok");
      setTimeout(() => window.location.href = "./how-to-register.html", 900);
    });
  }
})();

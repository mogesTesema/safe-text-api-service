// Landing Page Interactive Features

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("bg-slate-900/95");
    } else {
      navbar.classList.remove("bg-slate-900/95");
    }
  });

  // Animate progress bars when in view
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector(".progress-fill");
        const targetWidth = progressFill.dataset.width;
        setTimeout(() => {
          progressFill.style.width = targetWidth + "%";
        }, 200);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".feature-card").forEach((card) => {
    progressObserver.observe(card);
  });




 // Existing landing-page.js code remains unchanged above this comment

// --- Demo Section Logic ---
const demoInput = document.getElementById("demo-input");
const analyzeBtn = document.getElementById("analyze-btn");
const demoResult = document.getElementById("demo-result");
const demoLabelsContainer = document.getElementById("demo-labels-container");
const resultStatus = document.getElementById("result-status");
const processingTimeEl = document.getElementById("processing-time");

analyzeBtn.addEventListener("click", async () => {
  const text = demoInput.value.trim();
  if (!text) return;

  demoResult.classList.remove("hidden");
  demoLabelsContainer.innerHTML = "";
  resultStatus.textContent = "Analyzing...";
  processingTimeEl.textContent = "0.00s";

  const startTime = performance.now();

  try {
    const response = await fetch("https://mogestesema-safe-text-model.hf.space/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "test-api-key-123"
        },
        body: JSON.stringify({ text })
    });

    const result = await response.json();

    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    processingTimeEl.textContent = `${duration}s`;

    // Update status
    resultStatus.textContent = result.success ? 'Success' : 'Failed';
    resultStatus.className = result.success ? 'bg-green-500 px-3 py-1 rounded-full text-sm font-medium' : 'bg-red-500 px-3 py-1 rounded-full text-sm font-medium';

    // Append multi-label bars dynamically
    Object.keys(result).forEach(key => {
      if (key === 'success') return;
      const value = parseFloat(result[key]) || 0;
      const percentageText = value.toFixed(2) + '%';

      const color = value < 30 ? 'bg-green-500' : value < 70 ? 'bg-yellow-400' : 'bg-red-500';

      const wrapper = document.createElement('div');
      wrapper.className = 'label-bar mt-4';

      const labelText = document.createElement('div');
      labelText.className = 'flex justify-between text-sm font-medium text-slate-200 mb-1';
      labelText.innerHTML = `<span>${key.replace(/_/g, ' ')}</span><span>${percentageText}</span>`;

      const barBg = document.createElement('div');
      barBg.className = 'w-full bg-slate-600 rounded-full h-4';

      const barFg = document.createElement('div');
      barFg.className = `h-4 rounded-full transition-all duration-1000 ${color}`;
      barFg.style.width = value + '%';

      barBg.appendChild(barFg);
      wrapper.appendChild(labelText);
      wrapper.appendChild(barBg);

      demoLabelsContainer.appendChild(wrapper);
    });

  } catch (err) {
    resultStatus.textContent = 'Error';
    resultStatus.className = 'bg-red-500 px-3 py-1 rounded-full text-sm font-medium';
    console.error(err);
  }
});

  






  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".particle");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Add hover effects to feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Intersection Observer for animations
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll("section").forEach((section) => {
    animationObserver.observe(section);
  });

  // Konami Easter Egg
  let konamiCode = [];
  const expectedCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  document.addEventListener("keydown", (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > expectedCode.length) {
      konamiCode.shift();
    }
    if (
      konamiCode.length === expectedCode.length &&
      konamiCode.every((code, index) => code === expectedCode[index])
    ) {
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => (document.body.style.filter = ""), 3000);
      konamiCode = [];
    }
  });

  console.log("🛡️ Safe-Text-API Landing Page Loaded Successfully!");
  console.log("✨ Try the Konami code for a surprise!");
});

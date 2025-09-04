// Landing Page Interactive Features

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
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

    // Interactive Demo Functionality
    const demoInput = document.getElementById("demo-input");
    const analyzeBtn = document.getElementById("analyze-btn");
    const demoResult = document.getElementById("demo-result");
    const processingTime = document.getElementById("processing-time");
    const resultStatus = document.getElementById("result-status");
    const toxicityBar = document.getElementById("toxicity-bar");
    const toxicityScore = document.getElementById("toxicity-score");
    const confidenceBar = document.getElementById("confidence-bar");
    const confidenceScore = document.getElementById("confidence-score");

    analyzeBtn.addEventListener("click", function() {
        const text = demoInput.value.trim();

        if (!text) {
            alert("Please enter some text to analyze");
            return;
        }

        // Simulate API call
        analyzeBtn.textContent = "Analyzing...";
        analyzeBtn.disabled = true;

        const startTime = Date.now();

        // Simulate processing time
        setTimeout(() => {
            const endTime = Date.now();
            const duration = ((endTime - startTime) / 1000).toFixed(2);
            processingTime.textContent = duration + "s";

            // Simulate toxicity detection
            const toxicity = Math.random();
            const confidence = 0.85 + Math.random() * 0.15;

            // Update UI
            demoResult.classList.remove("hidden");

            // Set toxicity level and color
            let statusClass, statusText, barColor;
            if (toxicity < 0.3) {
                statusClass = "bg-green-500 text-white";
                statusText = "Safe";
                barColor = "bg-green-500";
            } else if (toxicity < 0.7) {
                statusClass = "bg-yellow-500 text-slate-900";
                statusText = "Warning";
                barColor = "bg-yellow-500";
            } else {
                statusClass = "bg-red-500 text-white";
                statusText = "Toxic";
                barColor = "bg-red-500";
            }

            resultStatus.className = `px-3 py-1 rounded-full text-sm font-medium ${statusClass}`;
            resultStatus.textContent = statusText;

            // Animate bars
            setTimeout(() => {
                toxicityBar.className = `h-full rounded-full transition-all duration-1000 ${barColor}`;
                toxicityBar.style.width = toxicity * 100 + "%";
                toxicityScore.textContent = (toxicity * 100).toFixed(1) + "%";

                confidenceBar.style.width = confidence * 100 + "%";
                confidenceScore.textContent = (confidence * 100).toFixed(1) + "%";
            }, 100);

            // Reset button
            analyzeBtn.textContent = "Analyze Text";
            analyzeBtn.disabled = false;
        }, 1000 + Math.random() * 2000);
    });

    // Typing effect for demo
    demoInput.addEventListener("focus", function() {
        if (this.value === "") {
            const sampleTexts = [
                "This is a great product!",
                "I love using this API",
                "Amazing service and support",
                "Really helpful for content moderation",
            ];
            const randomText =
                sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
            let i = 0;

            const typeWriter = () => {
                if (i < randomText.length) {
                    this.value += randomText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };

            setTimeout(typeWriter, 500);
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
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });

        card.addEventListener("mouseleave", function() {
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
        }, {
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
const stages = [
    "Initializing Core...",
    "Loading Assets...",
    "Compiling Shaders...",
    "Rendering UI...",
    "Finalizing...",
];

const offers = [
    { text: "🔥 PROMO: Free Trial Activated", class: "promo" },
    { text: "💎 -30% DISCOUNT Applied", class: "discount" },
    { text: "🚀 Premium Subscription Ready", class: "subscription" },
    { text: "⚡ Flash Offer Unlocked", class: "flash" },
    { text: "🎁 Bonus Content Loaded", class: "promo" }, // ← ADD THIS
];

const percentEl = document.querySelector(".loader-percent");
const stageEl = document.querySelector(".loader-stage");
const progressBar = document.querySelector(".progress-bar");
const loader = document.querySelector(".loader");
const main = document.querySelector(".main");

let progress = { value: 0 };

function runLoader() {
    const master = gsap.timeline();

    stages.forEach((stage, i) => {
        master.to(progress, {
            value: (i + 1) * 20,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
                const circle = document.querySelector(".progress-ring");
                const circumference = 440;

                gsap.fromTo(".loader-bg-glow", { scale: 1 }, { scale: 1.4, duration: 0.6, yoyo: true, repeat: 1 });

                percentEl.textContent = Math.floor(progress.value) + "%";
                progressBar.style.width = progress.value + "%";
            },
        });

        master.add(() => {
            stageEl.textContent = stage;
            if (offers[i]) {
                spawnBadge(offers[i % offers.length], i);
            }
        });
    });

    master.to(loader, {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.5,
    });

    master.to(
        main,
        {
            opacity: 1,
            duration: 1,
        },
        "-=0.5"
    );
}

runLoader();

/* ================= BADGE SPAWN ================= */

function spawnBadge(offer, i) {
    if (!offer) return;

    const badge = document.createElement("div");
    badge.classList.add("badge", offer.class);
    badge.textContent = offer.text;

    const x = 100;
    const y = 150 + i * 150;

    badge.style.left = x + "px";
    badge.style.top = y + "px";

    let rotate = Math.random() * 15;

    badge.style.transform = `rotate(${rotate}deg)`;

    document.body.appendChild(badge);

    const tl = gsap.timeline();

    tl.fromTo(
        badge,
        { scale: 0.3, opacity: 0, y: -20 },
        { scale: 1.2, opacity: 1, y: 0, duration: 0.6, ease: "back.out(2)" }
    );

    tl.to(badge, {
        y: "-=20",
        duration: 1.5,
        ease: "sine.inOut",
    });

    setTimeout(() => {
        tl.to(badge, {
            opacity: 0,
            rotation: gsap.utils.random(),
            scale: 0.5,
            duration: 1.2,
            ease: "power2.in",
        });
    }, 6000);
}

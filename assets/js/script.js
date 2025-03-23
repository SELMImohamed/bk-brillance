// Charger dynamiquement le fichier content.js depuis le backend Render
const script = document.createElement("script");
script.src = "https://bk-brillance.onrender.com/assets/data/content.js";
script.onload = () => {
  console.log("✅ Données chargées :", data);

  // HEADER
  document.getElementById("header-logo").textContent = data.header.logo;
  document.getElementById("header-cta").textContent = data.header.cta;

  const menuLinks = document.querySelectorAll("nav a");
  if (menuLinks.length) {
    data.header.menu.forEach((text, index) => {
      if (menuLinks[index]) menuLinks[index].textContent = text;
    });
  }

  // HERO
  document.getElementById("hero-title").textContent = data.hero.title;
  document.getElementById("hero-subtitle").textContent = data.hero.subtitle;
  document.getElementById("hero-cta").textContent = data.hero.cta;
  document.querySelector(".md\:w-1\/2 img").src = data.hero.image;

  // SERVICES
  const servicesContainer = document.getElementById("services-container");
  servicesContainer.innerHTML = "";
  data.services.forEach(service => {
    const isImage = service.icon.includes("assets/") || service.icon.startsWith("http");
    const iconHTML = isImage
      ? `<img src="\${service.icon}" alt="\${service.title}" class="w-12 h-12 mx-auto mb-4">`
      : `<div class="text-5xl mb-4">\${service.icon}</div>`;

    servicesContainer.innerHTML += `
      <div class="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        \${iconHTML}
        <h3 class="text-2xl font-semibold text-gray-900">\${service.title}</h3>
        <p class="text-gray-600 my-4">\${service.description}</p>
        <a href="\${service.link || '#'}" class="text-blue-600 font-semibold hover:underline flex items-center justify-center">
          En savoir plus →
        </a>
      </div>
    `;
  });

  // AVANTAGES (Why choose us)
  const whyChooseContainer = document.getElementById("why-choose-container");
  whyChooseContainer.innerHTML = "";
  data.why_choose_us.forEach(item => {
    const isImage = item.icon.includes("assets/") || item.icon.startsWith("http");
    const iconHTML = isImage
      ? `<img src="\${item.icon}" alt="\${item.title}" class="w-10 h-10">`
      : `<div class="text-4xl">\${item.icon}</div>`;

    whyChooseContainer.innerHTML += `
      <div class="text-center">
        <div class="bg-gray-200 w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-4">
          \${iconHTML}
        </div>
        <h3 class="text-xl font-semibold text-gray-900">\${item.title}</h3>
        <p class="text-gray-600 mt-2">\${item.description}</p>
      </div>
    `;
  });

  // TÉMOIGNAGES
  const testimonialsContainer = document.getElementById("testimonials-container");
  testimonialsContainer.innerHTML = "";
  data.testimonials.forEach(client => {
    let stars = "★".repeat(client.rating) + "☆".repeat(5 - client.rating);

    testimonialsContainer.innerHTML += `
      <div class="swiper-slide bg-white p-6 rounded-lg shadow-lg text-left border border-gray-200">
        <div class="flex items-center mb-4">
          <img src="\${client.image}" alt="\${client.name}" class="w-12 h-12 rounded-full mr-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">\${client.name}</h3>
            <p class="text-yellow-500">\${stars}</p>
          </div>
        </div>
        <p class="text-gray-600 italic">"\${client.comment}"</p>
      </div>
    `;
  });

  new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
};
document.body.appendChild(script);

// Correction erreur canvas (sécurisé)
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    // Initialiser chart ici si nécessaire
  }
});
// Charger dynamiquement le fichier content.js
const script = document.createElement("script");
script.src = "assets/data/content.js";
script.onload = () => {
  console.log("Données chargées :", data);

  // Header
  document.getElementById("header-logo").textContent = data.header.logo;
  document.getElementById("header-cta").textContent = data.header.cta;

  // Hero Section
  document.getElementById("hero-title").textContent = data.hero.title;
  document.getElementById("hero-subtitle").textContent = data.hero.subtitle;
  document.getElementById("hero-cta").textContent = data.hero.cta;
  document.querySelector("a[href='services.html']").textContent =
    data.hero.button_services;
  document.querySelector(".md\\:w-1\\/2 img").src = data.hero.image;

  // Menu dynamique
  const menuLinks = document.querySelectorAll("nav a");
  data.header.menu.forEach((text, index) => {
    menuLinks[index].textContent = text;
  });

  // Services
  const servicesContainer = document.getElementById("services-container");
  servicesContainer.innerHTML = "";
  data.services.forEach((service) => {
    servicesContainer.innerHTML += `
      <div class="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <div class="text-5xl mb-4">${service.icon}</div>
        <h3 class="text-2xl font-semibold text-gray-900">${service.title}</h3>
        <p class="text-gray-600 my-4">${service.description}</p>
        <a href="${service.link}" class="text-blue-600 font-semibold hover:underline flex items-center justify-center">
          En savoir plus →
        </a>
      </div>
    `;
  });

  // Témoignages - Carrousel
  const testimonialsContainer = document.getElementById(
    "testimonials-container"
  );
  testimonialsContainer.innerHTML = "";
  data.testimonials.forEach((client) => {
    let stars = "★".repeat(client.rating) + "☆".repeat(5 - client.rating);
    testimonialsContainer.innerHTML += `
      <div class="swiper-slide bg-white p-6 rounded-lg shadow-lg text-left border border-gray-200">
        <div class="flex items-center mb-4">
          <img src="${client.image}" alt="${client.name}" class="w-12 h-12 rounded-full mr-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">${client.name}</h3>
            <p class="text-yellow-500">${stars}</p>
          </div>
        </div>
        <p class="text-gray-600 italic">"${client.comment}"</p>
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
      768: {
        slidesPerView: 2,
        navigation: false,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Footer
  document.getElementById("footer-company-name").textContent =
    data.footer.company_name;
  document.getElementById("footer-company-desc").textContent =
    data.footer.company_desc;

  // Footer services dynamiques
  const footerServices = document.getElementById("footer-services");
  footerServices.innerHTML = "";
  data.footer.services.forEach((service) => {
    footerServices.innerHTML += `<li><a href="${service.link}" class="hover:text-white">${service.name}</a></li>`;
  });

  document.getElementById(
    "footer-phone"
  ).textContent = `📞 ${data.footer.contact.phone}`;
  document.getElementById(
    "footer-email"
  ).textContent = `📧 ${data.footer.contact.email}`;
  document.getElementById(
    "footer-hours"
  ).textContent = `🕒 ${data.footer.contact.hours}`;
};
document.body.appendChild(script);

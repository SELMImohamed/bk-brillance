// Gestion du menu mobile
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && menuClose && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
  });

  menuClose.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });

  // Fermer le menu si on clique sur un lien
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Fonction pour modifier le texte sans erreur si l'élément est absent
const setTextContent = (id, text) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  } else {
    console.warn(`⚠️ Élément #${id} introuvable dans le DOM.`);
  }
};

// Charger dynamiquement le fichier content.js
const script = document.createElement("script");
script.src = "server/assets/data/content.js";
script.onload = () => {
  console.log("✅ Données chargées :", data);

  // Header
  setTextContent("header-logo", data.header.logo);
  setTextContent("header-cta", data.header.cta);

  // Hero Section
  setTextContent("hero-title", data.hero.title);
  setTextContent("hero-subtitle", data.hero.subtitle);
  setTextContent("hero-cta", data.hero.cta);

  const heroImg = document.querySelector(".md\\:w-1\\/2 img");
  if (heroImg) heroImg.src = data.hero.image;

  // Menu dynamique
  const menuLinks = document.querySelectorAll("nav a");
  if (menuLinks.length) {
    data.header.menu.forEach((text, index) => {
      if (menuLinks[index]) menuLinks[index].textContent = text;
    });
  }

  // Services
  const servicesContainer = document.getElementById("services-container");
  if (servicesContainer) {
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
  }
  // Récupération du conteneur "Pourquoi nous choisir"
  const whyChooseContainer = document.getElementById("why-choose-container");

  if (whyChooseContainer) {
    console.log("📢 Injection des avantages dans 'Pourquoi nous choisir'"); // Vérification console
    whyChooseContainer.innerHTML = ""; // Vide avant d'ajouter

    data.why_choose_us.forEach((item) => {
      whyChooseContainer.innerHTML += `
      <div class="text-center">
        <div class="bg-gray-200 w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-4">
          <img src="${item.icon}" alt="${item.title}" class="w-10 h-10">
        </div>
        <h3 class="text-xl font-semibold text-gray-900">${item.title}</h3>
        <p class="text-gray-600 mt-2">${item.description}</p>
      </div>
    `;
    });
  } else {
    console.warn(
      "⚠️ Le conteneur #why-choose-container est introuvable dans le DOM."
    );
  }

  // Témoignages - Carrousel
  const testimonialsContainer = document.getElementById(
    "testimonials-container"
  );
  if (testimonialsContainer) {
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
  }
  const surfaceInput = document.getElementById("surface");
  const surfaceValue = document.getElementById("surface-value");

  if (surfaceInput && surfaceValue) {
    surfaceInput.addEventListener("input", () => {
      surfaceValue.textContent = surfaceInput.value + " m²";
    });
  }

  // Footer
  setTextContent("footer-company-name", data.footer.company_name);
  setTextContent("footer-company-desc", data.footer.company_desc);

  // Footer services dynamiques
  const footerServices = document.getElementById("footer-services");
  if (footerServices) {
    footerServices.innerHTML = "";
    data.footer.services.forEach((service) => {
      footerServices.innerHTML += `<li><a href="${service.link}" class="hover:text-white">${service.name}</a></li>`;
    });
  }

  setTextContent("footer-phone", `📞 ${data.footer.contact.phone}`);
  setTextContent("footer-email", `📧 ${data.footer.contact.email}`);
  setTextContent("footer-hours", `🕒 ${data.footer.contact.hours}`);

  // Vérification favicon
  const favicon = document.querySelector("link[rel='icon']");
  if (!favicon) {
    console.warn(
      "⚠️ Favicon non trouvé ! Ajoute un fichier favicon.ico à la racine du projet."
    );
  }
};
document.body.appendChild(script);
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le comportement par défaut
    const targetId = link.getAttribute("href").substring(1); // Récupère l'ID sans le #
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});
const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];

function createBubble() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    radius: Math.random() * 10 + 5,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
  };
}

for (let i = 0; i < 50; i++) {
  bubbles.push(createBubble());
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach((bubble, index) => {
    bubble.y -= bubble.speed;
    if (bubble.y < -bubble.radius) {
      bubbles[index] = createBubble();
    }

    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(animateBubbles);
}

animateBubbles();

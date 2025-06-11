import { db } from "./firebase-config.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const docRef = doc(db, "content", "homepage");

async function loadContent() {
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;
  const data = snap.data();

  // Header
  document.getElementById("header_logo").textContent = data.header.logo;
  document.getElementById("header_cta").textContent = data.header.cta;

  // Hero
  document.getElementById("hero_title").textContent = data.hero.title;
  document.getElementById("hero_subtitle").textContent = data.hero.subtitle;
  document.getElementById("hero_cta").textContent = data.hero.cta;
  document.getElementById("hero_image").src = data.hero.image;

  // Footer
  document.getElementById("company_name").textContent = data.footer.company_name;
  document.getElementById("company_desc").textContent = data.footer.company_desc;
  document.getElementById("phone").textContent = data.footer.contact.phone;
  document.getElementById("email").textContent = data.footer.contact.email;
  document.getElementById("hours").textContent = data.footer.contact.hours;
  document.getElementById("facebook").href = data.footer.socials.facebook;
  document.getElementById("instagram").href = data.footer.socials.instagram;
  document.getElementById("linkedin").href = data.footer.socials.linkedin;

  // Services
  const servicesContainer = document.getElementById("services-container");
  data.services.forEach((service) => {
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded shadow text-left";
    card.innerHTML = `
      <div class="text-3xl mb-2">${service.icon}</div>
      <h3 class="font-bold text-xl mb-1">${service.title}</h3>
      <p class="text-sm text-gray-600">${service.description}</p>
    `;
    servicesContainer.appendChild(card);
  });

  // Pourquoi nous
  const whyContainer = document.getElementById("why-choose-container");
  data.why_choose_us.forEach((item) => {
    const block = document.createElement("div");
    block.className = "bg-white p-6 rounded shadow text-center";
    block.innerHTML = `
      <div class="text-3xl mb-2">${item.icon}</div>
      <h3 class="font-bold text-lg mb-1">${item.title}</h3>
      <p class="text-sm text-gray-600">${item.description}</p>
    `;
    whyContainer.appendChild(block);
  });

  // Témoignages
  const swiperContainer = document.getElementById("testimonials-container");
  data.testimonials.forEach((t) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide bg-white p-6 rounded shadow text-left max-w-md mx-auto";
    slide.innerHTML = `
      <p class="text-gray-700 italic mb-4">“${t.comment}”</p>
      <div class="flex items-center gap-4">
        <div>
          <p class="font-semibold">${t.name}</p>
          <p class="text-yellow-500 text-sm">${"★".repeat(t.rating)}</p>
        </div>
      </div>
    `;
    swiperContainer.appendChild(slide);
  });

  // Init Swiper
  new Swiper(".swiper", {
    loop: true,
    slidesPerView: 2,      // ← Affiche 2 slides en même temps
    spaceBetween: 30,      // ← Espacement entre les slides
    autoplay: { delay: 5000 },
    pagination: { el: ".swiper-pagination" }
  });
}

loadContent();

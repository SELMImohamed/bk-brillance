document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("https://bk-brillance.onrender.com/assets/data/content.js?ts=" + Date.now());
    const text = await res.text();

    // 🔍 Affiche les données brutes dans la console pour vérification
    console.log("📦 Données reçues :", text);

    // Transforme le texte JS en objet JS
    const data = eval(text.replace("const data = ", "").replace(/;$/, ""));
    console.log("✅ Données évaluées :", data);

    // HERO
    document.getElementById("hero-title").textContent = data.hero.title;
    document.getElementById("hero-subtitle").textContent = data.hero.subtitle;
    document.getElementById("hero-cta").textContent = data.hero.cta;
    document.getElementById("hero-image").src = data.hero.image;

    // FOOTER
    document.getElementById("footer-company-name").textContent = data.footer.company_name;
    document.getElementById("footer-company-desc").textContent = data.footer.company_desc;
    document.getElementById("footer-phone").textContent = `📞 ${data.footer.contact.phone}`;
    document.getElementById("footer-email").textContent = `📧 ${data.footer.contact.email}`;
    document.getElementById("footer-hours").textContent = `🕒 ${data.footer.contact.hours}`;
    document.getElementById("footer-facebook").href = data.footer.socials.facebook;
    document.getElementById("footer-instagram").href = data.footer.socials.instagram;
    document.getElementById("footer-linkedin").href = data.footer.socials.linkedin;

    // SERVICES
    const servicesContainer = document.getElementById("services-container");
    servicesContainer.innerHTML = "";
    data.services.forEach((service) => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-lg p-6 text-left";
        card.innerHTML = `
      <div class="text-4xl mb-4">${service.icon}</div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">${service.title}</h3>
      <p class="text-gray-600">${service.description}</p>
    `;
        servicesContainer.appendChild(card);
    });

    // WHY CHOOSE US
    const whyContainer = document.getElementById("why-choose-container");
    whyContainer.innerHTML = "";
    data.why_choose_us.forEach((item) => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-lg shadow-lg p-6";
        card.innerHTML = `
      <div class="text-4xl mb-4">${item.icon}</div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">${item.title}</h3>
      <p class="text-gray-600">${item.description}</p>
    `;
        whyContainer.appendChild(card);
    });

    // TESTIMONIALS
    const testimonialsContainer = document.getElementById("testimonials-container");
    testimonialsContainer.innerHTML = "";
    data.testimonials.forEach((testimonial) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide bg-white rounded-lg shadow-lg p-6";
        slide.innerHTML = `
      <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mx-auto mb-4" />
      <h4 class="text-lg font-bold text-gray-800">${testimonial.name}</h4>
      <p class="text-gray-600 mt-2 mb-2">${testimonial.comment}</p>
      <p class="text-yellow-400">${"★".repeat(testimonial.rating)}${"☆".repeat(5 - testimonial.rating)}</p>
    `;
        testimonialsContainer.appendChild(slide);
    });

    // FOOTER year
    document.getElementById("footer-year").textContent = new Date().getFullYear();
});

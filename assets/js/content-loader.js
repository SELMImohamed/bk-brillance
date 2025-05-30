document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("https://bk-brillance.onrender.com/api/content?ts=" + Date.now());
        const data = await res.json();

        console.log("✅ Données chargées :", data);

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

        // Année dans le footer
        document.getElementById("footer-year").textContent = new Date().getFullYear();
    } catch (error) {
        console.error("❌ Erreur lors du chargement du contenu :", error);
    }
});
  
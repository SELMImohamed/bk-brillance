// admin/admin.js

const script = document.createElement("script");
script.src = "../assets/data/content.js";
script.onload = () => {
  console.log("✅ Données chargées depuis content.js :", data);

  // Charger données générales
  document.getElementById("company_name").value =
    data.footer?.company_name || "";
  document.getElementById("company_desc").value =
    data.footer?.company_desc || "";

  // Coordonnées
  document.getElementById("phone").value = data.footer?.contact?.phone || "";
  document.getElementById("email").value = data.footer?.contact?.email || "";
  document.getElementById("hours").value = data.footer?.contact?.hours || "";
  document.getElementById("hero_title").value = data.hero?.title || "";
  document.getElementById("hero_subtitle").value = data.hero?.subtitle || "";
  document.getElementById("hero_cta").value = data.hero?.cta || "";
  document.getElementById("hero_image").value = data.hero?.image || "";

  // Réseaux
  document.getElementById("facebook").value =
    data.footer?.socials?.facebook || "";
  document.getElementById("instagram").value =
    data.footer?.socials?.instagram || "";
  document.getElementById("linkedin").value =
    data.footer?.socials?.linkedin || "";

  // Services
  if (data.services) {
    services.push(...data.services);
    renderServices();
  }

  // Témoignages
  if (data.testimonials) {
    testimonials.push(...data.testimonials);
    renderTestimonials();
  }
};
document.body.appendChild(script);

// SERVICES
const services = [];
const servicesContainer = document.getElementById("services-container");
const addServiceBtn = document.getElementById("add-service");

const renderServices = () => {
  servicesContainer.innerHTML = "";
  services.forEach((service, index) => {
    servicesContainer.innerHTML += `
      <div class="relative border p-4 rounded space-y-2 bg-gray-50">
        <button onclick="removeService(${index})" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">🗑</button>
        <input type="text" placeholder="Titre" value="\${service.title}" onchange="updateService(\${index}, 'title', this.value)" class="w-full p-2 border rounded"/>
        <textarea placeholder="Description" onchange="updateService(\${index}, 'description', this.value)" class="w-full p-2 border rounded">\${service.description}</textarea>
        <input type="text" placeholder="Icône" value="\${service.icon}" onchange="updateService(\${index}, 'icon', this.value)" class="w-full p-2 border rounded"/>
      </div>
    `;
  });
};
window.updateService = (index, field, value) =>
  (services[index][field] = value);
window.removeService = (index) => {
  services.splice(index, 1);
  renderServices();
};
addServiceBtn.addEventListener("click", () => {
  services.push({ title: "", description: "", icon: "" });
  renderServices();
});

// TÉMOIGNAGES
const testimonials = [];
const testimonialsContainer = document.getElementById("testimonials-container");
const addTestimonialBtn = document.getElementById("add-testimonial");

const renderTestimonials = () => {
  testimonialsContainer.innerHTML = "";
  testimonials.forEach((t, index) => {
    testimonialsContainer.innerHTML += `
      <div class="relative border p-4 rounded space-y-2 bg-gray-50">
        <button onclick="removeTestimonial(${index})" class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">🗑</button>
        <input type="text" placeholder="Nom" value="\${t.name}" onchange="updateTestimonial(\${index}, 'name', this.value)" class="w-full p-2 border rounded" />
        <textarea placeholder="Commentaire" onchange="updateTestimonial(\${index}, 'comment', this.value)" class="w-full p-2 border rounded">\${t.comment}</textarea>
        <input type="number" min="1" max="5" placeholder="Note" value="\${t.rating}" onchange="updateTestimonial(\${index}, 'rating', this.value)" class="w-full p-2 border rounded" />
        <input type="text" placeholder="Image" value="\${t.image}" onchange="updateTestimonial(\${index}, 'image', this.value)" class="w-full p-2 border rounded" />
      </div>
    `;
  });
};
window.updateTestimonial = (index, field, value) =>
  (testimonials[index][field] = value);
window.removeTestimonial = (index) => {
  testimonials.splice(index, 1);
  renderTestimonials();
};
addTestimonialBtn.addEventListener("click", () => {
  testimonials.push({ name: "", comment: "", rating: 5, image: "" });
  renderTestimonials();
});

// ENREGISTREMENT GLOBAL (unifié)
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      header: {
        logo: document.getElementById("company_name").value,
        cta: "Devis gratuit",
        menu: ["Services", "Pourquoi nous", "Témoignages", "Contact"],
      },
      footer: {
        company_name: document.getElementById("company_name").value,
        company_desc: document.getElementById("company_desc").value,
        services: [],
        contact: {
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          hours: document.getElementById("hours").value,
        },
        socials: {
          facebook: document.getElementById("facebook").value,
          instagram: document.getElementById("instagram").value,
          linkedin: document.getElementById("linkedin").value,
        },
      },
      hero: {
        title: document.getElementById("hero_title").value,
        subtitle: document.getElementById("hero_subtitle").value,
        cta: document.getElementById("hero_cta").value,
        button_services: "Nos services",
        image: document.getElementById("hero_image").value,
      },
      services: services,
      testimonials: testimonials,
      why_choose_us: [],
    };

    console.log("📤 Envoi des données :", updatedData);

    try {
      const res = await fetch("http://localhost:3000/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        document
          .querySelectorAll("p[id$='save-message']")
          .forEach((el) => el.classList.remove("hidden"));
        document.getElementById("hero-save-message").classList.remove("hidden");
      } else {
        alert("❌ Erreur d’enregistrement.");
      }
    } catch (err) {
      console.error("❌ Erreur serveur :", err);
      alert("❌ Erreur de connexion.");
    }
  });
});

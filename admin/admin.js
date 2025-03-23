const script = document.createElement("script");
script.src = "../assets/data/content.js";
script.onload = () => {
  document.getElementById("company_name").value =
    data.footer?.company_name || "";
  document.getElementById("company_desc").value =
    data.footer?.company_desc || "";
  document.getElementById("phone").value = data.footer?.contact?.phone || "";
  document.getElementById("email").value = data.footer?.contact?.email || "";
  document.getElementById("hours").value = data.footer?.contact?.hours || "";
  document.getElementById("facebook").value =
    data.footer?.socials?.facebook || "";
  document.getElementById("instagram").value =
    data.footer?.socials?.instagram || "";
  document.getElementById("linkedin").value =
    data.footer?.socials?.linkedin || "";
  document.getElementById("hero_title").value = data.hero?.title || "";
  document.getElementById("hero_subtitle").value = data.hero?.subtitle || "";
  document.getElementById("hero_cta").value = data.hero?.cta || "";
  document.getElementById("hero_image").value = data.hero?.image || "";
  if (data.services) services.push(...data.services), renderServices();
  if (data.testimonials)
    testimonials.push(...data.testimonials), renderTestimonials();
  if (data.why_choose_us)
    whyChooseUs.push(...data.why_choose_us), renderWhyChooseUs();
};
document.body.appendChild(script);

const services = [],
  testimonials = [],
  whyChooseUs = [];

function renderBlock(container, items, keys, removeFn, updateFn) {
  container.innerHTML = "";
  items.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "border p-4 rounded space-y-2 bg-gray-50 relative";

    const remove = document.createElement("button");
    remove.className =
      "absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl";
    remove.innerText = "🗑";
    remove.onclick = () => {
      removeFn(i);
    };

    div.append(remove);

    keys.forEach((k) => {
      const label = document.createElement("label");
      label.className = "block text-sm font-semibold";
      label.innerText = k.charAt(0).toUpperCase() + k.slice(1);

      const input =
        k === "description" || k === "comment"
          ? document.createElement("textarea")
          : document.createElement("input");

      if (k === "rating") input.type = "number";
      else input.type ||= "text";

      input.value = item[k];
      input.className = "w-full p-2 border rounded";
      input.oninput = (e) => updateFn(i, k, e.target.value);

      div.append(label, input);
    });

    container.append(div);
  });
}

function renderServices() {
  renderBlock(
    document.getElementById("services-container"),
    services,
    ["title", "description", "icon"],
    removeService,
    updateService
  );
}
function updateService(i, k, v) {
  services[i][k] = v;
  renderServices();
}
function removeService(i) {
  services.splice(i, 1);
  renderServices();
}
document.getElementById("add-service").onclick = () => {
  services.push({ title: "", description: "", icon: "" });
  renderServices();
};

function renderTestimonials() {
  renderBlock(
    document.getElementById("testimonials-container"),
    testimonials,
    ["name", "comment", "rating", "image"],
    removeTestimonial,
    updateTestimonial
  );
}
function updateTestimonial(i, k, v) {
  testimonials[i][k] = v;
  renderTestimonials();
}
function removeTestimonial(i) {
  testimonials.splice(i, 1);
  renderTestimonials();
}
document.getElementById("add-testimonial").onclick = () => {
  testimonials.push({ name: "", comment: "", rating: 5, image: "" });
  renderTestimonials();
};

function renderWhyChooseUs() {
  renderBlock(
    document.getElementById("why-choose-container"),
    whyChooseUs,
    ["title", "description", "icon"],
    removeWhy,
    updateWhy
  );
}
function updateWhy(i, k, v) {
  whyChooseUs[i][k] = v;
  renderWhyChooseUs();
}
function removeWhy(i) {
  whyChooseUs.splice(i, 1);
  renderWhyChooseUs();
}
document.getElementById("add-why").onclick = () => {
  whyChooseUs.push({ title: "", description: "", icon: "" });
  renderWhyChooseUs();
};

document.querySelectorAll("form").forEach((f) =>
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      header: {
        logo: document.getElementById("company_name").value,
        cta: "Devis gratuit",
        menu: ["Services", "Pourquoi nous", "Témoignages", "Contact"],
      },
      footer: {
        company_name: document.getElementById("company_name").value,
        company_desc: document.getElementById("company_desc").value,
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
        services: [],
      },
      hero: {
        title: document.getElementById("hero_title").value,
        subtitle: document.getElementById("hero_subtitle").value,
        cta: document.getElementById("hero_cta").value,
        button_services: "Nos services",
        image: document.getElementById("hero_image").value,
      },
      services,
      testimonials,
      why_choose_us: whyChooseUs,
    };

    try {
      const res = await fetch("https://bk-brillance-api.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok)
        document
          .querySelectorAll("p[id$='save-message']")
          .forEach((p) => p.classList.remove("hidden"));
    } catch (err) {
      alert("❌ Erreur de connexion au serveur.");
      console.error(err);
    }
  })
);

import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const docRef = doc(db, "content", "homepage");

// Charger les données existantes dans le formulaire
async function loadContent() {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();

    // HERO
    document.getElementById("hero_title").value = data.hero.title;
    document.getElementById("hero_subtitle").value = data.hero.subtitle;
    document.getElementById("hero_cta").value = data.hero.cta;

    // FOOTER
    document.getElementById("footer_company_name").value = data.footer.company_name;
    document.getElementById("footer_company_desc").value = data.footer.company_desc;
    document.getElementById("footer_phone").value = data.footer.contact.phone;
    document.getElementById("footer_email").value = data.footer.contact.email;
    document.getElementById("footer_hours").value = data.footer.contact.hours;
    document.getElementById("footer_facebook").value = data.footer.socials.facebook;
    document.getElementById("footer_instagram").value = data.footer.socials.instagram;
    document.getElementById("footer_linkedin").value = data.footer.socials.linkedin;

    // HEADER
    document.getElementById("header_logo").value = data.header.logo;
    document.getElementById("header_cta").value = data.header.cta;
  }
}

loadContent();

// Sauvegarder les modifications
document
  .getElementById("admin-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      hero: {
        title: document.getElementById("hero_title").value,
        subtitle: document.getElementById("hero_subtitle").value,
        cta: document.getElementById("hero_cta").value
      },
      footer: {
        company_name: document.getElementById("footer_company_name").value,
        company_desc: document.getElementById("footer_company_desc").value,
        contact: {
          phone: document.getElementById("footer_phone").value,
          email: document.getElementById("footer_email").value,
          hours: document.getElementById("footer_hours").value
        },
        socials: {
          facebook: document.getElementById("footer_facebook").value,
          instagram: document.getElementById("footer_instagram").value,
          linkedin: document.getElementById("footer_linkedin").value
        },
        services: [] // à gérer plus tard
      },
      header: {
        logo: document.getElementById("header_logo").value,
        cta: document.getElementById("header_cta").value,
        menu: ["Services", "Pourquoi nous", "Témoignages", "Contact"] // fixe pour l’instant
      }
    };

    await setDoc(docRef, updatedData, { merge: true });
    alert("✅ Données mises à jour !");
  });

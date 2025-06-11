// canvas-editor.js
import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const docRef = doc(db, "content", "homepage");
let data = {};

async function loadData() {
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;
  data = snap.data();
  populateInlineText();
  renderBlocks();
  renderMenu();
}

function populateInlineText() {
  document.querySelectorAll("[data-path]").forEach(el => {
    const path = el.dataset.path;
    const value = path.split(".").reduce((acc, key) => acc?.[key], data);
    if (el.tagName === "INPUT") el.value = value;
    else el.textContent = value;
  });
  document.getElementById("hero-image-preview").src = data.hero.image;
  document.getElementById("hero-image-input").value = data.hero.image;
}

function updateFirestore(path, value) {
  const update = path.split(".").reverse().reduce((acc, key) => ({ [key]: acc }), value);
  return setDoc(docRef, update, { merge: true });
}

const toggleBtn = document.getElementById("toggleEdit");
let editMode = false;
toggleBtn.onclick = () => {
  editMode = !editMode;
  document.querySelectorAll("[contenteditable]").forEach(el => el.contentEditable = editMode);
  toggleBtn.textContent = editMode ? "Désactiver l'édition" : "Activer l'édition";
};

document.querySelectorAll("[contenteditable]").forEach(el => {
  el.addEventListener("blur", () => {
    if (!editMode) return;
    updateFirestore(el.dataset.path, el.textContent.trim());
  });
});

document.getElementById("hero-image-input").addEventListener("change", (e) => {
  const url = e.target.value;
  document.getElementById("hero-image-preview").src = url;
  updateFirestore("hero.image", url);
});

function renderBlocks() {
  renderList("services-section", data.services, "services");
  renderList("why-section", data.why_choose_us, "why_choose_us");
  renderList("testimonials-section", data.testimonials, "testimonials");
}

function renderList(containerId, list, key) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  list.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow cursor-pointer hover:ring-2 hover:ring-blue-400";
    card.innerHTML = `
      <div class="text-3xl">${item.icon || "🌟"}</div>
      <h3 class="text-xl font-bold mt-2">${item.title || item.name}</h3>
      <p class="text-sm text-gray-600">${item.description || item.comment || ""}</p>
      ${item.image ? `<img src="${item.image}" class="w-16 h-16 rounded-full mt-2" />` : ""}
      <button class="mt-2 text-red-500 text-sm" onclick="removeItem('${key}', ${index})">Supprimer</button>
    `;
    card.addEventListener("click", () => openEditModal(key, index, item));
    container.appendChild(card);
  });
  const addBtn = document.createElement("button");
  addBtn.className = "mt-4 bg-green-600 text-white px-4 py-2 rounded";
  addBtn.textContent = `+ Ajouter ${key}`;
  addBtn.onclick = () => addItem(key);
  container.appendChild(addBtn);
}

function openEditModal(sectionKey, index, item) {
  const fields = Object.keys(item);
  const form = document.createElement("form");
  form.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded z-50 w-[90%] max-w-md";
  form.innerHTML = `<h2 class="text-xl font-bold mb-4">Modifier ${sectionKey}</h2>`;

  fields.forEach(f => {
    const label = document.createElement("label");
    label.className = "block text-sm font-medium text-gray-700 mt-2";
    label.textContent = f;

    const input = document.createElement("input");
    input.className = "w-full mt-1 p-2 border rounded";
    input.value = item[f];

    input.onchange = async () => {
      data[sectionKey][index][f] = input.value;
      await setDoc(docRef, { [sectionKey]: data[sectionKey] }, { merge: true });
      loadData();
      form.remove();
    };

    form.appendChild(label);
    form.appendChild(input);
  });

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "mt-4 px-4 py-2 bg-gray-600 text-white rounded";
  closeBtn.textContent = "Fermer";
  closeBtn.onclick = () => form.remove();
  form.appendChild(closeBtn);

  document.body.appendChild(form);
}

async function addItem(sectionKey) {
  const template = sectionKey === "services"
    ? { title: "", description: "", icon: "" }
    : sectionKey === "why_choose_us"
    ? { title: "", description: "", icon: "" }
    : { name: "", comment: "", rating: 5, image: "" };

  data[sectionKey].push(template);
  await setDoc(docRef, { [sectionKey]: data[sectionKey] }, { merge: true });
  loadData();
}

async function removeItem(sectionKey, index) {
  data[sectionKey].splice(index, 1);
  await setDoc(docRef, { [sectionKey]: data[sectionKey] }, { merge: true });
  loadData();
}

function renderMenu() {
  const menu = data.header.menu;
  const container = document.getElementById("header-menu-edit");
  container.innerHTML = "";
  menu.forEach((item, i) => {
    const input = document.createElement("input");
    input.className = "w-full p-2 border rounded mb-2";
    input.value = item;
    input.onchange = () => {
      data.header.menu[i] = input.value;
      updateFirestore("header.menu", data.header.menu);
    };
    container.appendChild(input);
  });
  const add = document.createElement("button");
  add.className = "bg-green-600 text-white px-4 py-2 rounded";
  add.textContent = "+ Ajouter un lien";
  add.onclick = () => {
    data.header.menu.push("Nouveau lien");
    updateFirestore("header.menu", data.header.menu).then(loadData);
  };
  container.appendChild(add);
}

loadData();
async function fetchContentData() {
  const res = await fetch(`/assets/data/content.js?ts=${Date.now()}`);
  const text = await res.text();

  // ⚠️ transforme la string JS en objet JavaScript réel
  const data = eval(text.replace("const data = ", "").replace(/;$/, ""));
  return data;
}

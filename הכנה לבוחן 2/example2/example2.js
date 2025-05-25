let allResults = []; 

async function load() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await res.json();
  allResults = data.results;
  renderCards(allResults);
}

function renderCards(array) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  array.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>ID:</strong> ${index + 1}</p>
    `;
    container.appendChild(card);
  });
}
//חיפוש לפי משהו ספציפי
function setupSearch() {
  const input = document.getElementById("search");
  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    const filtered = allResults.filter(p => p.name.includes(value));
    renderCards(filtered);
  });
}

load();
setupSearch();

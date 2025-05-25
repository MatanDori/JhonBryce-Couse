// DOM element references
const input = document.getElementById("searchInput"); // text input for user search
const searchBtn = document.getElementById("searchBtn"); // "Search" button
const showAllBtn = document.getElementById("showAllBtn"); // "Show All" button
const regionFilter = document.getElementById("regionFilter"); // dropdown for region filter

// Table and chart elements
const countryTable = document.getElementById("countryTable").querySelector("tbody");
const statsTable = document.getElementById("statsTable").querySelector("tbody");
const regionTable = document.getElementById("regionTable").querySelector("tbody");
const regionChartCanvas = document.getElementById("regionPieChart"); // canvas for Chart.js

// App state
let allCountries = []; // full list of countries loaded from API
let regionChart = null; // Chart.js instance for pie chart

//---------------------------------------------------------
// [Optional Feature - Disabled]
// Save and restore last search using localStorage
//---------------------------------------------------------

// window.addEventListener("load", () => {
//   const last = localStorage.getItem("lastSearch");
//   if (last) {
//     input.value = last;
//     searchCountriesByName(last);
//   }
// });

//---------------------------------------------------------
// Event: Search by country name
//---------------------------------------------------------
searchBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value) {
    // localStorage.setItem("lastSearch", value); // (disabled)
    searchCountriesByName(value);
  }
});

//---------------------------------------------------------
// Event: Show all countries
//---------------------------------------------------------
showAllBtn.addEventListener("click", () => {
  input.value = "";
  // localStorage.removeItem("lastSearch"); // (disabled)
  fetchAllCountries();
});

//---------------------------------------------------------
// Event: Filter by region (from dropdown)
//---------------------------------------------------------
regionFilter.addEventListener("change", () => {
  const region = regionFilter.value;
  const filtered = region ? allCountries.filter(c => c.region === region) : allCountries;
  renderAll(filtered);
});

//---------------------------------------------------------
// Function: Search countries from API by name
//---------------------------------------------------------
async function searchCountriesByName(name) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!res.ok) throw new Error("Not found");

    const data = await res.json();
    renderAll(data);
  } catch {
    // Display error message if no country found
    countryTable.innerHTML = "<tr><td colspan='4'>Country not found.</td></tr>";
    statsTable.innerHTML = "";
    regionTable.innerHTML = "";
    if (regionChart) regionChart.destroy(); // remove previous chart
  }
}

//---------------------------------------------------------
// Function: Load all countries from API
//---------------------------------------------------------
async function fetchAllCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    allCountries = data;
    renderAll(data);
  } catch {
    countryTable.innerHTML = "<tr><td colspan='4'>Error loading data.</td></tr>";
  }
}

//---------------------------------------------------------
// Function: Render all components based on country data
//---------------------------------------------------------
function renderAll(data) {
  renderCountries(data);
  renderStats(data);
  renderRegions(data);
}

//---------------------------------------------------------
// Function: Render country table (flag, name, capital, population)
//---------------------------------------------------------
function renderCountries(data) {
  countryTable.innerHTML = "";

  data.forEach(country => {
    const tr = document.createElement("tr");

    const flagTd = document.createElement("td");
    flagTd.innerHTML = `<img src="${country.flags.png}" alt="flag" />`;

    const nameTd = document.createElement("td");
    nameTd.textContent = country.name.common;

    const capitalTd = document.createElement("td");
    capitalTd.textContent = country.capital?.[0] || "N/A"; // Optional chaining for missing capitals

    const popTd = document.createElement("td");
    popTd.textContent = country.population.toLocaleString();

    tr.append(flagTd, nameTd, capitalTd, popTd);
    countryTable.appendChild(tr);
  });
}

//---------------------------------------------------------
// Function: Render statistics summary (count, sum, average)
//---------------------------------------------------------
function renderStats(data) {
  const total = data.length;
  const sum = data.reduce((acc, c) => acc + c.population, 0);
  const avg = Math.round(sum / total);

  statsTable.innerHTML = `
    <tr>
      <td>${total}</td>
      <td>${sum.toLocaleString()}</td>
      <td>${avg.toLocaleString()}</td>
    </tr>
  `;
}

//---------------------------------------------------------
// Function: Count and display number of countries per region
//---------------------------------------------------------
function renderRegions(data) {
  const counts = {};

  data.forEach(c => {
    const region = c.region || "Unknown";
    counts[region] = (counts[region] || 0) + 1;
  });

  // Display counts in regionTable
  regionTable.innerHTML = "";
  Object.entries(counts).forEach(([region, count]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${region}</td><td>${count}</td>`;
    regionTable.appendChild(tr);
  });

  // Also display as pie chart
  renderPieChart(counts);
}

//---------------------------------------------------------
// Function: Render pie chart (Chart.js) for region distribution
//---------------------------------------------------------
function renderPieChart(regionCounts) {
  const ctx = regionChartCanvas.getContext("2d");

  const labels = Object.keys(regionCounts); // e.g. Africa, Asia...
  const values = Object.values(regionCounts); // counts

  // If previous chart exists → destroy it before drawing new one
  if (regionChart) regionChart.destroy();

  regionChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        label: "Countries by Region",
        data: values,
        backgroundColor: [
          "#4CAF50", "#FF9800", "#2196F3", "#E91E63", "#9C27B0", "#FFC107", "#607D8B"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "right" },
        title: { display: true, text: "Countries per Region" }
      }
    }
  });
}

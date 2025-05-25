async function loadPopulationChart() {
  const res = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");//שליפת נתוני אוכלוסייה
  const data = await res.json();//המרה לקובץ שניתן לעבוד איתו

  //חילוץ נתונים מתאימים לגרפים
  const years = data.data.map(item => item.Year).reverse();
  const populations = data.data.map(item => item.Population).reverse();//change order
//יצירת הגרף
  const ctx = document.getElementById("populationChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: years,
      datasets: [{
        label: "Population",
        data: populations,
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

loadPopulationChart();

async function loadUniversities() {
  const res = await fetch("https://datausa.io/api/searchLegacy/?limit=10&dimension=University&hierarchy=University&q=");
  const data = await res.json();

  const container = document.getElementById("universities");
//בניית כרטיסי האוניברסיטאות
  data.results.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>ID:</strong> ${item.id}</p>
      <p><strong>Score:</strong> ${item.score}</p>
    `;

    container.appendChild(card);
  });
}

loadUniversities();


async function loadPopulationChart() {
    const url = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
    const res = await fetch(url);
    const data = await res.json();
    const years = data.data.map(entry => entry.Year);
    const populations = data.data.map(entry => entry.Population);
    const ctx = document.getElementById("populationChart").getContext("2d");//קריאה למיקום הספציפי בעמוד
    new Chart(ctx, {
        type: "bar", //עמודות
        data: {
          labels: years, // Axis X
          datasets: [{
            label: "Population",//כותרת
            data: populations, // Axis Y
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,//מתאים לגודל המסך
          scales: {
            y: {
              beginAtZero: true,
              ticks: {//להציג פסיקים
                callback: function(value) {
                  return value.toLocaleString(); 
                }
              }
            }
          }
        }
      });     
}
//קריאה לפונקציה
loadPopulationChart();

async function loadUniversityCards() {
    const url = 'https://datausa.io/api/searchLegacy/?limit=10&dimension=University&hierarchy=University&q=';
    const res = await fetch(url);
    const data = await res.json();
  
    const container = document.getElementById("universityCards");
  
    data.results.forEach(university => {
      const card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <h3>${university.name}</h3>
        <p>ID: ${university.id}</p>
        <p>Score: ${university.score}</p>
      `;
  
      container.appendChild(card);
    });
  }

 loadUniversityCards();


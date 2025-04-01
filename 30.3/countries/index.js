const DOM = {
    selectCountry: null,
    loader: null,
}

function init() {
    DOM.selectCountry = document.getElementById("countriesSelect")
    DOM.loader = document.getElementById("loader")

    DOM.selectCountry.addEventListener("change", async function () {
        try {
            showLoader()
            const c = await getCountryByCode(this.value)
            if (c) {
                drawCountryDetails(c)
            }
        } catch (error) {
            console.log(error)
        } finally {
            hideLoader()
        }
    })
    showCountriesNames()
}

function drawCountriesSelect(data) {
    if (!Array.isArray(data)) return;
    console.log(data, "drawing...")
    data.forEach((currentCountry) => {
        const optionElement = `<option value='${currentCountry.cca3}'> ${currentCountry?.name?.common} </option>`
        DOM.selectCountry.innerHTML += optionElement
    })
}
async function showCountriesNames() {
    try {
        const result = await getCountriesApi();

        drawCountriesSelect(result);

        const countriesByRegion = countCountriesByRegion(result);
        const populationByRegion = countPopulationByRegion(result);

        // ציור הגרפים
        drawPieChart("countriesPerRegionChart", countriesByRegion, "Number of Countries per Region");
        drawPieChart("populationPerRegionChart", populationByRegion, "Total Population per Region");

    } catch (ex) {
        console.log(ex);
        alert("Something went wrong!");
    } finally {
        console.log("another async function done running");
    }
}

async function getCountriesApi() {
    const result = await fetch(`https://restcountries.com/v3.1/all`)
    const data = await result.json()
    return data
}
async function getCountryByCode(code) {
    const result = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    const data = await result.json()
    const [firstCountry] = data

    const svgFlag = await fetch(firstCountry?.flags?.svg)
    const svgText = await svgFlag.text()

    return {
        name: firstCountry?.name?.official,
        flag: firstCountry?.flags?.svg,
        svgText
    }
}

function drawCountryDetails(country) {
    const content = document.getElementById("countryDetailsContent")
    content.innerHTML = `<div>  
    <h1> ${country.name} </h1>
    <img src=${country.flag} height=200 width=200    />
    </div> 
    ${country.svgText}
    `

}
function showLoader() {
    DOM.loader.style.display = "flex"
}
function hideLoader() {
    DOM.loader.style.display = "none"
}

// פונקציה שסופרת את כמות המדינות בכל אזור
function countCountriesByRegion(countries) {
    const result = {};

    countries.forEach(country => {
        const region = country.region || "Unknown";

        // אם האזור כבר קיים, נוסיף 1, אחרת נתחיל לספור מ-1
        if (result[region]) {
            result[region]++;
        } else {
            result[region] = 1;
        }
    });

    return result;
}

function countPopulationByRegion(countries) {
    const result = {};

    countries.forEach(country => {
        const region = country.region || "Unknown";
        const population = country.population || 0;

        if (result[region]) {
            result[region] += population;
        } else {
            result[region] = population;
        }
    });

    return result;
}
function drawPieChart(canvasId, dataObject, title) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Area name: ["Asia", "Europe"]
    const labels = Object.keys(dataObject);

    // values: [50, 44]
    const data = Object.values(dataObject);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f1c40f',
                    '#e67e22',
                    '#e74c3c',
                    '#9b59b6',
                    '#1abc9c'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}



init()

